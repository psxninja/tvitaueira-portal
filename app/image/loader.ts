'use client'

export default function myImageLoader({
	src,
	width,
	quality
}: {
	src: string
	width: number
	quality: number
}) {
	if (src.indexOf('?') !== -1) {
		return `/api/image/${src}&w=${width || 810}&q=${quality || 75}`
	}
	return `/api/image/${src}?w=${width || 810}&q=${quality || 75}`
}
