import express, { Express } from 'express'
import cors from 'cors'
import { customLogMiddleware } from './src/config/logs'
import path from 'path'
import { errorMiddleware } from './src/middlewares/error'

const app: Express = express()

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

app.use(cors())
app.use(customLogMiddleware)

app.use(errorMiddleware)
export default app
