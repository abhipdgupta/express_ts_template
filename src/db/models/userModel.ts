import mongoose from 'mongoose'
import { UserRoles } from '../../constants/userRoles'

const UserSchema = new mongoose.Schema({
  avatar: { type: String, default: '' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: UserRoles.USER },
  refresh_token: {
    token: {
      type: String,
      default: null,
    },
    expiry_date: {
      type: Date,
      default: null,
    },
  },
  createdAt: { type: Date, default: Date.now },
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
