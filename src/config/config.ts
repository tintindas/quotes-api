import dotenv from 'dotenv'

dotenv.config()

const config = {
	MONGO_PASS: process.env.MONGO_PASS,
	MONGO_USER: process.env.MONGO_USER,
	MONGO_DB: process.env.MONGO_DB
}

export default config

console.log(config.MONGO_PASS)
console.log(config.MONGO_USER)
console.log(config.MONGO_DB)
