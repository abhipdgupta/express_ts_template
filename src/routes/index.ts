import express from 'express'
import authRouter from './authRoutes'

const rootRouter = express.Router()

rootRouter.use('/auth', authRouter)

export default rootRouter
