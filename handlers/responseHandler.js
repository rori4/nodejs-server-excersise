const fs = require('fs')

function getContentType(path) {
	const fileType = path.split('.').pop()
	switch (fileType) {
		case 'css':
			return 'text/css'
		case 'ico':
			return 'image/x-icon'
		case 'png':
			return 'image/png'
		default:
			return 'text/html'
	}
}

function getResponse(path, res){
	fs.readFile(`${path}`, (err, data) => {
		if (err) {
			console.log(err)
			return
		}
		res.writeHead(200, {
			'Content-Type': getContentType(path),
		})
		res.write(data)
		res.end()
	})
}

module.exports = { getResponse }