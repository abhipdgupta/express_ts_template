import mongoose from 'mongoose'
import { env } from '../config/config'

const mongoUri = env.MONGODB_URI!

export const connectDB = async () => {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log('MONGODB DATABASE CONNECTED')
    })
    .catch((err) => {
      console.log(`ERROR: ${err}`)
      process.exit(0)
    })
}
