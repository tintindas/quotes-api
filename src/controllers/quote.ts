import { Request, Response } from 'express'
import { Error } from 'mongoose'
import Quote from '../models/quote'
import IQuote from '../interfaces/quote'

const getAllQuotes = (req: Request, res: Response) => {
	Quote.find()
		.limit(parseInt(String(req.query.limit), 10))
		.exec()
		.then((results: IQuote[]) => {
			return res.status(200).json({
				quotes: results,
				count: results.length
			})
		})
		.catch((err: Error) => {
			return res.status(500).json({
				message: err.message,
				err
			})
		})
}

const getQuotesByAuthor = (req: Request, res: Response) => {
	const author = req.params.nameOfAuthor

	Quote.find({ author })
		.limit(parseInt(String(req.query.limit), 10))
		.exec()
		.then((results: IQuote[]) => {
			if (results.length !== 0) {
				return res.status(200).json({
					quotes: results,
					count: results.length
				})
			} else {
				return res.status(404).json({
					message: `No quotes found by ${author}.`
				})
			}
		})
		.catch((err: Error) => {
			return res.status(500).json({
				message: err.message,
				err
			})
		})
}

const getQuotesBySource = (req: Request, res: Response) => {
	const source = req.params.nameOfSource

	Quote.find({ source })
		.limit(parseInt(String(req.query.limit), 10))
		.exec()
		.then((results: IQuote[]) => {
			if (results.length !== 0) {
				return res.status(200).json({
					quotes: results,
					count: results.length
				})
			} else {
				return res.status(404).json({
					message: `No quotes found from ${source}.`
				})
			}
		})
		.catch((err: Error) => {
			return res.status(500).json({
				message: err.message,
				err
			})
		})
}

const getRandomQuotes = (req: Request, res: Response) => {
	let limit = req.query.limit ?? '1'
	limit = String(limit)
	const size = parseInt(limit)

	Quote.aggregate([{ $sample: { size } }])
		.exec()
		.then((results: IQuote[]) => {
			return res.status(200).json({
				quotes: results,
				length: results.length
			})
		})
		.catch((err: Error) => {
			return res.status(500).json({
				message: err.message,
				err
			})
		})
}

export default {
	getAllQuotes,
	getQuotesByAuthor,
	getQuotesBySource,
	getRandomQuotes
}
