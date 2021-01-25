import dotenv from 'dotenv'

dotenv.config()

const MONGO_OPTIONS = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	keepAlive: true,
	poolSize: 50
}

const MONGO_USER = process.env.MONGO_USER
const MONGO_PASS = process.env.MONGO_PASS
const MONGO_DB = process.env.MONGO_DB

const MONGO = {
	user: MONGO_USER,
	password: MONGO_PASS,
	db: MONGO_DB,
	options: MONGO_OPTIONS,
	url: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0-yo7rn.mongodb.net/${MONGO_DB}`
}

const PORT = process.env.PORT || 3000

const config = {
	port: PORT,
	mongo: MONGO
}

export default config
