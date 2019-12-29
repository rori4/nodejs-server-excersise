const { getResponse } = require('./responseHandler');

const NotFoundHandler = (req, res) => {
	if (req.method === 'GET') {
		getResponse('./views/404.html', res)
		return true
	}
}

module.exports = { NotFoundHandler }