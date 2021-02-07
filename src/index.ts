//import external modules
import express, { Application } from 'express'
import mongoose, { Error } from 'mongoose'
import cors from 'cors'
import config from './config/config'

//import internal modules
import quoteRoutes from './routes/quote'
import authorRoutes from './routes/author'
import sourceRoutes from './routes/source'

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
app.use('/sources', sourceRoutes)

// PORT
app.listen(config.port, () => {
	console.log(`Server started on ${config.port}`)
})
