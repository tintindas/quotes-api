import express, { Application } from 'express'
import mongoose, { Error } from 'mongoose'
import cors from 'cors'
import config from './config/config'

import quoteRoutes from './routes/quote'
import authorRoutes from './routes/author'

const app: Application = express()
app.use(cors())

// Connect to Database
mongoose
	.connect(config.mongo.url, config.mongo.options)
	.then(() => console.log('Connected to mongoDB!'))
	.catch((err: Error) => {
		console.error(err)
	})

// ROUTES
app.use('/quotes', quoteRoutes)
app.use('/authors', authorRoutes)

// //HOME

// SEARCH

// app.get('/quotes', (req, res) => {
// 	if (!req.query.source && !req.query.author) {
// 		Quote.find()
// 			.limit(parseInt(req.query.limit, 10))
// 			.then((foundQuotes) => {
// 				if (foundQuotes.length !== 0) {
// 					res.send(foundQuotes)
// 				} else {
// 					res.send({ message: 'No quotes from requested author.' })
// 				}
// 			})
// 			.catch((error) => {
// 				res.send(error)
// 			})
// 	} else {
// 		if (req.query.source) {
// 			var query = titleCase(req.query.source)
// 		}

// 		if (req.query.author) {
// 			var query = titleCase(req.query.author)
// 		}

// 		Quote.find()
// 			.or([{ author: query }, { source: query }])
// 			.limit(parseInt(req.query.limit, 10))
// 			.then((foundQuotes) => {
// 				if (foundQuotes.length !== 0) {
// 					res.send(foundQuotes)
// 				} else {
// 					res.send({ message: 'No quotes from ' + query + '.' })
// 				}
// 			})
// 			.catch((error) => {
// 				res.send(error)
// 			})
// 	}
// })

// // LIST AUTHORS

// app.get('/authors', (req, res) => {
// 	Quote.distinct('author').then((foundAuthors) => {
// 		res.send(foundAuthors)
// 	})
// })

// // RANDOM QUOTE

// app.get('/quotes/random', (req, res) => {
// 	Quote.estimatedDocumentCount().exec((err, count) => {
// 		let randNum = Math.floor(Math.random() * count)

// 		Quote.findOne()
// 			.skip(randNum)
// 			.exec((err, foundQuote) => {
// 				if (!err) {
// 					res.send(foundQuote)
// 				} else {
// 					res.send(err)
// 				}
// 			})
// 	})
// })

//PORT

app.listen(config.port, () => {
	console.log(`Server started on ${config.port}`)
})
