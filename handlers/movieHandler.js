const db = require('../config/dataBase')
const fs = require('fs')
const qs = require('querystring')
const { getResponse } = require('./responseHandler')

const movieHandler = (req, res) => {
	if (req.path === '/viewAllMovies' && req.method === 'GET') {
		fs.readFile('./views/viewAll.html', (err, data) => {
			if (err) {
				console.log(err)
				return
			}
			fs.readFile('./config/dataBase.json', (err, db) => {
				if (err) {
					console.log(err)
					return
				}
				let allMoviesHTML = ''
				db = JSON.parse(db)
				for (const movie of db.movies) {
					let movieHTML = `<div class="movie">`
					movieHTML += `<a href="/movies/details/${movie.id}" />`
					movieHTML += `<img class="moviePoster" src="${movie.moviePoster}" />`
					movieHTML += `</a>`
					movieHTML += `</div>`
					allMoviesHTML += movieHTML
				}
				let responseHTML = data
					.toString()
					.replace('<div id="replaceMe">{{replaceMe}}</div>', allMoviesHTML)
				res.writeHead(200, {
					'Content-Type': 'text/html',
				})
				res.write(responseHTML)
				res.end()
			})
		})
		return true
	}
	if (req.path === '/addMovie') {
		if (req.method === 'GET') {
			getResponse('./views/addMovie.html', res)
			return true
		} else if (req.method === 'POST') {
			let body = ''
			req.on('data', chunk => {
				body += chunk.toString() // convert Buffer to string
			})
			req.on('end', () => {
				const movie = qs.parse(body)
				fs.readFile('./config/dataBase.json', (err, data) => {
					if (err) {
						console.log(err)
						return
					}
					const json = JSON.parse(data)
					movie.id = json.movies.length + 1
					json.movies.push(movie)
					fs.writeFile('./config/dataBase.json', JSON.stringify(json), () => {
						console.log(`Movie ${movie.movieTitle} added to database!`)
					})
				})
				res.writeHead(302, {
					Location: '/viewAllMovies',
				})
				res.end()
			})
			return true
		}
	}
	if (req.path.startsWith('/movies/details/') && req.method === 'GET') {
		fs.readFile('./views/details.html', (err, data) => {
			if (err) {
				console.log(err)
				return
			}
			fs.readFile('./config/dataBase.json', (err, db) => {
				const id = req.path.split('/movies/details/')[1]
				const movie = JSON.parse(db).movies.find(movie => movie.id == id)
				let movieDetails = `
				<h2>${movie.movieTitle}</h2>
				<img src="${movie.moviePoster}" alt="" />
				<h3>Year: ${movie.movieYear}</h3>
				<p>${movie.movieDescription}</p>
			`
				let responseHTML = data
					.toString()
					.replace('{{replaceMe}}', movieDetails)
				res.writeHead(200, {
					'Content-Type': 'text/html',
				})
				res.write(responseHTML)
				res.end()
			})
		})
		return true
	}
}

module.exports = { movieHandler }
