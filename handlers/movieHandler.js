const db = require('../config/dataBase');
const fs = require('fs');
const qs = require('querystring');


const movieHandler = ( req, res ) => {
	if (req.path === '/viewAllMovies' && req.method === 'GET') {
		fs.readFile('./views/viewAll.html', (err, data)=> {
			if(err){
				console.log(err)
				return
			}
			let allMoviesHTML = ''
			for (const movie of db) {
				let movieHTML =`<div class="movie">`
				movieHTML += `<img class="moviePoster" src="${movie.moviePoster}" />`
				movieHTML += `</div>`
				allMoviesHTML += movieHTML
			}
			let responseHTML = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', allMoviesHTML)
			res.writeHead(200, {
				'Content-Type' : 'text/html'
			})
			res.write(responseHTML)
			res.end()
		})
		return true
	}
}

module.exports = { movieHandler }