import { extname, join } from 'path'
import { existsSync } from 'fs'
import { mkdir, unlink, writeFile } from 'fs/promises'
import sql from '@/app/lib/db'
import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { SqlResponse } from '@/app/types/sqlResponse'

export async function POST(req: NextRequest) {
	const updatedat = Math.floor(Date.now() / 1000)
	const imgsPath = join(process.cwd() + '/files', '/imgs', '/posts')
	const data = await req.formData()
	const postslug = data.get('slug')
	const file = data.get('files[]') as File | null
	let filename = ''

	const prevPost: any = await sql`SELECT
	title,slug,category,visible,image,description
	FROM posts
	WHERE slug = ${postslug}`

	if (file) {
		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)
		const fileExt = extname(file.name)
		filename = `${postslug}${fileExt}`

		const lastPic =
			prevPost.length ?? join(`${imgsPath}/${prevPost[0].image}`)

		if (!existsSync(imgsPath)) {
			await mkdir(imgsPath)
		}

		if (lastPic && existsSync(lastPic)) {
			await unlink(lastPic)
		}

		await writeFile(join(`${imgsPath}/${filename}`), buffer)
	}

	const sqlData: { [key: string]: FormDataEntryValue | null } = {
		title: data.get('title') || prevPost[0].title,
		slug: postslug || prevPost[0].slug,
		category: data.get('category') || prevPost[0].category,
		visible: data.get('visible') || prevPost[0].visible,
		image: file ? filename : prevPost[0].image,
		description: data.get('description') || prevPost[0].description,
		content: data.get('content')
	}

	if (
		!sqlData.title &&
		sqlData.title === '' &&
		!sqlData.slug &&
		sqlData.slug === '' &&
		!sqlData.description &&
		sqlData.description === ''
	) {
		return new Response(JSON.stringify({ code: '2' }), { status: 400 })
	}

	try {
		let updatedPost = {} as SqlResponse

		if (!sqlData.content || sqlData.content === '') {
			updatedPost = (await sql`UPDATE posts SET
			title=${sqlData.title},slug=${sqlData.slug},category=${sqlData.category},
			visible=${sqlData.visible},image=${sqlData.image},description=${sqlData.description},
			updatedat=${updatedat} WHERE slug = ${postslug}`) as SqlResponse
		} else {
			updatedPost = (await sql`UPDATE posts SET
			title=${sqlData.title},slug=${sqlData.slug},category=${sqlData.category},
			visible=${sqlData.visible},image=${sqlData.image},description=${sqlData.description},
			content=${sqlData.content},updatedat=${updatedat} WHERE slug = ${postslug}`) as SqlResponse
		}

		if (updatedPost.affectedRows) {
			if (prevPost[0].category === '0') {
				updatedPost = (await sql`UPDATE posts SET
				createdat='${updatedat}' WHERE slug = '${postslug}'`) as SqlResponse
			}

			if (updatedPost.affectedRows) {
				revalidatePath('/(blog)', 'page')
				revalidatePath(`/(admin)/posts`, 'page')
				revalidatePath(`/(admin)/posts/draft`, 'page')
				revalidatePath(`/(blog)/${sqlData.category}`, 'page')
				revalidatePath(`/(blog)/[categoryslug]/${postslug}`, 'page')
				return new Response(JSON.stringify({ code: '1' }))
			}
		}
		if (filename !== '') {
			const uploadedImageTrash = join(`${imgsPath}/${filename}`)
			if (existsSync(uploadedImageTrash)) {
				await unlink(uploadedImageTrash)
			}
		}
		return new Response(JSON.stringify({ code: '2' }), { status: 400 })
	} catch (error) {
		if (filename !== '') {
			const uploadedImageTrash = join(`${imgsPath}/${filename}`)
			if (existsSync(uploadedImageTrash)) {
				await unlink(uploadedImageTrash)
			}
		}
		return new Response(JSON.stringify({ code: '3', error }), {
			status: 500
		})
	}
}
