import dotenv from 'dotenv'
dotenv.config()


import app from './app'
import { connectDB } from './src/db/dbConnect'

;(async () => {
  await connectDB()
})()

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
