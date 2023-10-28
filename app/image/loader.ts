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
	return `/api/image/${src}?w=${width || 810}&q=${quality || 75}`
}
