/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		loader: 'custom',
		loaderFile: './app/image/loader.ts'
	}
}

module.exports = nextConfig
