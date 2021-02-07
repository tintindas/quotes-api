import { Request, Response } from 'express'
import { Error } from 'mongoose'
import Quote from '../models/quote'

const getAllSources = (req: Request, res: Response) => {
	Quote.distinct('source')
		.exec()
		.then((results: string[]) => {
			return res.status(200).json({
				authors: results,
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

export default { getAllSources }
