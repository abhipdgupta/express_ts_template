import { Document, ObjectId } from 'mongoose'

// Define the interface extending Document
interface IUser extends Document {
  _id:ObjectId,  
  name: string
  email: string
  password: string
  refresh_token: {
    token: string | null
    expiry_date: Date | null
  }
  role: string
  createdAt: Date
}

export default IUser
