import { extname, join } from 'path'
import { existsSync } from 'fs'
import { mkdir, unlink, writeFile } from 'fs/promises'
import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import sql from '@/app/lib/db'
import { SqlResponse } from '@/app/types/sqlResponse'

export async function POST(req: NextRequest) {
	const updatedat = Math.floor(Date.now() / 1000)
	const imgsPath = join(process.cwd() + '/files', '/imgs', '/posts')
	const data = await req.formData()
	const postslug = data.get('slug')

	const file = data.get('files[]') as File | null
	let filename = ''

	if (file) {
		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)
		const fileExt = extname(file.name)
		filename = `${postslug}${fileExt}`

		if (!existsSync(imgsPath)) {
			await mkdir(imgsPath)
		}

		await writeFile(join(`${imgsPath}/${filename}`), buffer)
	}

	const sqlData: { [key: string]: FormDataEntryValue | null } = {
		title: data.get('title'),
		slug: postslug,
		category: data.get('category') || '0',
		visible: data.get('visible'),
		image: file ? filename : '',
		description: data.get('description'),
		content: data.get('content')
	}

	const sqlDataKeys = [...(new Set(Object.keys(sqlData)) as unknown as [])]
	const sqlDataValues = [
		...(new Set(Object.values(sqlData)) as unknown as [])
	]

	if (sqlDataKeys.length !== sqlDataValues.length) {
		return new Response(JSON.stringify({ code: '2' }), { status: 400 })
	}

	try {
		const insertedPost = (await sql`INSERT IGNORE INTO
		posts(title,slug,category,visible,image,description,content,createdat)
		VALUES(
			${sqlData.title},
			${sqlData.slug},
			${sqlData.category},
			${sqlData.visible},
			${sqlData.image},
			${sqlData.description},
			${sqlData.content},
			${updatedat}
		)`) as SqlResponse

		if (insertedPost.affectedRows) {
			revalidatePath('/(blog)', 'page')
			revalidatePath(`/(admin)/admin/posts`, 'page')
			revalidatePath(`/(admin)/admin/posts/draft`, 'page')
			revalidatePath(`/(blog)/${sqlData.category}`, 'page')
			revalidatePath(`/(blog)/[categoryslug]/${postslug}`, 'page')
			return new Response(JSON.stringify({ code: '1' }))
		}
		if (filename !== '') {
			const uploadedImageTrash = join(`${imgsPath}/${filename}`)
			if (existsSync(uploadedImageTrash)) {
				await unlink(uploadedImageTrash)
			}
		}

		return new Response(JSON.stringify({ code: '3' }), { status: 400 })
	} catch (error) {
		if (filename !== '') {
			const uploadedImageTrash = join(`${imgsPath}/${filename}`)
			if (existsSync(uploadedImageTrash)) {
				await unlink(uploadedImageTrash)
			}
		}

		return new Response(JSON.stringify({ code: '4' }), { status: 500 })
	}
}
