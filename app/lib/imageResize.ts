import fs from 'fs'
import sharp from 'sharp'

export default function imageResize(
	path: string,
	format: string,
	width: number,
	height: number
) {
	const readStream = fs.createReadStream(path)
	let transform = sharp()

	if (format) {
		transform = transform.toFormat('webp')
	}

	if (width && height) {
		transform = transform.resize(width, height, {
			kernel: sharp.kernel.nearest,
			fit: 'contain',
			position: 'center',
			background: { r: 255, g: 255, b: 255, alpha: 1 }
		})
	}

	if (width && !height) {
		transform = transform.resize(width, null, {
			kernel: sharp.kernel.nearest,
			fit: 'contain',
			position: 'center',
			background: { r: 255, g: 255, b: 255, alpha: 1 }
		})
	}

	return readStream.pipe(transform)
}
