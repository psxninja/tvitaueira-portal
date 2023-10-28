import { extname, join } from 'path'
import { existsSync } from 'fs'
import { mkdir, unlink, writeFile } from 'fs/promises'
import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import excuteQuery from '@/app/lib/db'
import { SqlResponse } from '@/app/types/sqlResponse'

export async function POST(req: NextRequest) {
	const updatedat = Math.floor(Date.now() / 1000)
	const imgsPath = join(process.cwd() + '/static', '/imgs', '/posts')
	const data = await req.formData()
	const postslug = (data.get('slug') + '') as string

	const file = data.get('files[]') as File | null
	let filename = ''
	const prevPost: any = await excuteQuery({
		query: `SELECT image, category
		FROM posts
		WHERE slug = '${postslug}'`
	})

	if (file) {
		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)
		const fileExt = extname(file.name)
		const fileUuid = data.get('slug')
		filename = `${fileUuid}${fileExt}`

		const lastPic = prevPost.length
			? join(`${imgsPath}/${prevPost[0].image}`)
			: ''

		if (!existsSync(imgsPath)) {
			await mkdir(imgsPath)
		}

		if (existsSync(lastPic)) {
			await unlink(lastPic)
		}

		await writeFile(join(`${imgsPath}/${filename}`), buffer)
	}

	const userData: { [key: string]: string } = {
		title: (data.get('title') + '') as string,
		slug: postslug,
		category: (data.get('category') + '') as string,
		visible: (data.get('visible') + '') as string,
		image: file ? filename : '',
		description: (data.get('description') + '') as string,
		content: (data.get('content') + '') as string
	}

	const userDataFieldsArr = Object.keys(userData)
	let userDataFields = ''
	userDataFieldsArr.forEach((field, index) => {
		if (userData[field] === 'null') return
		if (userData[field] === '') return
		if (index === 0) {
			userDataFields += `${field}=?`
			return
		}
		userDataFields += `,${field}=?`
	})

	if (prevPost[0].category !== '0') {
		userDataFields += `,updatedat=?`
	}

	const userDataValuesArr = Object.values(userData)
	const userDataValuesArray: string[] = []
	userDataValuesArr.forEach((value) => {
		if (value === '' || value === 'null') return
		userDataValuesArray.push(value)
	})

	if (prevPost[0].category !== '0') {
		userDataValuesArray.push(updatedat + '')
	}

	const sqlQuery = `UPDATE posts SET ${userDataFields} WHERE slug = '${postslug}'`

	try {
		const result = (await excuteQuery({
			query: sqlQuery,
			values: userDataValuesArray
		})) as SqlResponse

		console.log(userDataFields, userDataValuesArray, result)

		if (result.affectedRows) {
			revalidatePath('/(blog)', 'page')
			revalidatePath(`/(admin)/posts`, 'page')
			revalidatePath(`/(blog)/[categoryslug]/${postslug}`, 'page')
			return new Response(JSON.stringify({ code: '1' }))
		}
		if (filename !== '') {
			const uploadedImageTrash = join(`${imgsPath}/${filename}`)
			if (existsSync(uploadedImageTrash)) {
				await unlink(uploadedImageTrash)
			}
		}
		return new Response(JSON.stringify({ code: '2' }))
	} catch (error) {
		if (filename !== '') {
			const uploadedImageTrash = join(`${imgsPath}/${filename}`)
			if (existsSync(uploadedImageTrash)) {
				await unlink(uploadedImageTrash)
			}
		}
		return new Response(JSON.stringify({ code: '3', error }))
	}
}
