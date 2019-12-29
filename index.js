const http = require('http')
const url = require('url')
const handlers = require('./handlers/index')
const port = 3000
const { getResponse } = require('./handlers/responseHandler')
http
	.createServer((req, res) => {
		req.path = url.parse(req.url).pathname
		let urlFound = false
		for (const handler of handlers) {
			if (handler(req, res)) {
				urlFound = true
				break
			}
		}
		if (!urlFound) {
			getResponse('./views/404.html', res)
		}
	})
	.listen(port)

console.log(`Server running at http://localhost:${port}`)
