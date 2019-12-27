const fs = require('fs')
const { getResponse } = require('./responseHandler');

module.exports = (req, res) => {
	if (req.path.startsWith('/') && req.method === 'GET') {
		getResponse('./views/home.html', res)
		return true
	}
}
