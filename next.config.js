/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		/* minimumCacheTTL: 86400, */
		loader: 'custom',
		loaderFile: './app/image/loader.ts'
	}
}

module.exports = nextConfig
