import express from 'express'
import controller from '../controllers/quote'

const router = express.Router()

router.get('/', controller.getAllQuotes)

export default router
