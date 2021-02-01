import express from 'express'
import controller from '../controllers/author'

const router = express.Router()

router.get('/', controller.getAllAuthors)

export default router
