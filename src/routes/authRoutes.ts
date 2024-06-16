import express from 'express'
import {
  handleLoginUser,
  handleRegisterUser,
  handleRefreshAccessToken,
  handleLogoutUser,
  handleGetUserInfo
} from '../controllers/authControllers'
import { catchAsyncError } from '../middlewares/catchAsyncError'
import { requireValidUser } from '../middlewares/auth'

const authRouter = express.Router()

authRouter.post('/login', catchAsyncError(handleLoginUser))
authRouter.post('/register', catchAsyncError(handleRegisterUser))
authRouter.post(
  '/refresh-access-token',
  catchAsyncError(handleRefreshAccessToken),
)
authRouter.post('/logout', requireValidUser, catchAsyncError(handleLogoutUser))
authRouter.get('/user-info', requireValidUser, catchAsyncError(handleGetUserInfo))

export default authRouter
