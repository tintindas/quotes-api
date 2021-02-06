import express from 'express'
import controller from '../controllers/quote'

const router = express.Router()

router.get('/', controller.getAllQuotes)
router.get('/author/:nameOfAuthor', controller.getQuotesByAuthor)
router.get('/source/:nameOfSource', controller.getQuotesBySource)
router.get('/random', controller.getRandomQuotes)

export default router
