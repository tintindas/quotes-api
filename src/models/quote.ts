import mongoose, { Schema } from 'mongoose'
import IQuote from '../interfaces/quote'

const quoteSchema: Schema = new Schema({
	quoteText: { type: String, required: true },
	author: { type: String, required: true },
	source: { type: String },
	tags: { type: Array }
})

export default mongoose.model<IQuote>('Quote', quoteSchema)
