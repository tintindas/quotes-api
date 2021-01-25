import { Document } from 'mongoose'

export default interface Quote extends Document {
	quoteText: string
	author: string
	source: string | null
	tags: string[] | null
}
