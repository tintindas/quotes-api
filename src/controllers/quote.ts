import { NextFunction, Request, Response } from 'express'
import { Error } from 'mongoose'
import Quote from '../models/quote'
import IQuote from '../interfaces/quote'

const getAllQuotes = (req: Request, res: Response, next: NextFunction) => {
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

export default { getAllQuotes }
