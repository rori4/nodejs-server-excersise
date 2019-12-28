const { staticFileHandler } = require('./staticFileHandler')
const { homeHandler }  = require('./homeHandler')
const { movieHandler } = require('./movieHandler')

module.exports = [
	staticFileHandler,
	homeHandler,
	movieHandler
]
