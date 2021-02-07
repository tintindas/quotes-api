import express from 'express'
import controller from '../controllers/source'

const router = express.Router()

router.get('/', controller.getAllSources)

export default router
