const { staticFileHandler } = require('./staticFileHandler')
const homeHandler = require('./homeHandler')
// const movieHandler = require('./movie-handler')

module.exports = [
	staticFileHandler,
	homeHandler,
	//movieHandler
]
