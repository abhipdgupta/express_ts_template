import express, { Express } from 'express'
import cors from 'cors'
import { customLogMiddleware } from './src/config/logs'
import path from 'path'
import { errorMiddleware } from './src/middlewares/error'
import rootRouter from './src/routes'

const app: Express = express()

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(cors())
app.use(customLogMiddleware)

app.use('/api', rootRouter)

app.use(errorMiddleware)
export default app
