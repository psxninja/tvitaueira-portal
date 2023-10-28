import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import imageResize from '@/app/lib/imageResize'

export async function GET(
	req: NextRequest,
	{
		params
	}: {
		params: { imagename: string }
	}
) {
	const url = new URL(req.url)
	const searchParams = new URLSearchParams(url.search)
	const width = searchParams.get('w') || ''
	const height = searchParams.get('h') || ''
	const { imagename } = params

	const _width = +width > 810 ? 810 : +width
	const _height = +height ? +height : 540

	if (!_width) {
		if (width !== 'full') {
			return new Response(JSON.stringify({ code: '2' }), {
				status: 400
			})
		}
	}

	const ext = path.extname(imagename).substring(1)
	const formats = [
		'heic',
		'heif',
		'jpeg',
		'jpg',
		'png',
		'raw',
		'tiff',
		'webp'
	]

	if (!formats.includes(ext)) {
		return new Response(JSON.stringify({ code: '3' }), {
			status: 400
		})
	}

	const pathImage = path.resolve('./files/imgs/posts', imagename)
	const image: any = imageResize(pathImage, ext, _width, _height)
	const res = new NextResponse(image, {
		status: 200,
		headers: new Headers({
			'content-type': `image/webp`,
			'Cache-Control': 'public,max-age=86400,stale-while-revalidate'
		})
	})

	return res
}
