const http = require('http')
const url = require('url')
const handlers = require('./handlers/index')
const port = 3000

http
	.createServer((req, res) => {
		req.path = url.parse(req.url).pathname
		for (const handler of handlers) {
			if(handler(req,res)) {
				break
			}
		}
	})
	.listen(port)

console.log(`Server running at http://localhost:${port}`)
