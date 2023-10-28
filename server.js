const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { extname, join } = require('path')
const fs = require('fs')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	createServer((req, res) => {
		const parsedUrl = parse(req.url, true)
		if (extname(parsedUrl.pathname)) {
			const path = join(__dirname, 'public', parsedUrl.pathname)
			console.log('path=' + path)
			if (fs.existsSync(path)) {
				var stream = fs.createReadStream(path)
				stream.on('error', function () {
					res.writeHead(404)
					res.end()
				})
				stream.pipe(res)
			} else {
				handle(req, res, parsedUrl)
			}
		} else {
			handle(req, res, parsedUrl)
		}
	}).listen(port, (err) => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${port}`)
	})
})
