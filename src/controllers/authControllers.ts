import { RequestHandler } from 'express'
import {
  addUser,
  getUserByEmail,
  getUserById,
  updateUser,
} from '../services/userService'
import { apiResponse } from '../utils/apiResponse'
import HttpStatusCodes from '../constants/httpStatusCodes'
import {
  TokenExpiredError,
  TokenInvalidError,
  UnauthorizedError,
  UserNotFoundError,
} from '../exceptions/exceptions'
import { comparePasswords, hashPassword } from '../utils/password'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../services/tokenService'

export const handleRegisterUser: RequestHandler = async (req, res, next) => {
  const body: { email: string; name: string; password: string } = req.body

  //  1. hash password
  const hashedPassword = await hashPassword(body.password)

  //  2. add user
  const user = await addUser({
    email: body.email,
    name: body.name,
    password: hashedPassword,
  })

  return apiResponse(
    res,
    HttpStatusCodes.CREATED,
    'Register User successfully',
    {
      user: user.toObject(),
    },
  )
}

export const handleLoginUser: RequestHandler = async (req, res, next) => {
  const body: { email: string; password: string } = req.body

  //   1. check user exist
  const savedUser = await getUserByEmail(body.email)
  if (!savedUser) {
    throw new UserNotFoundError("Provided email doesn't exist")
  }

  //   2. compare password
  const isPasswordCorrect = await comparePasswords(
    body.password,
    savedUser.password,
  )
  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Password is wrong')
  }

  //  3. generate access token
  const access_token = await generateAccessToken(savedUser._id.toHexString())

  // 4. Check if refresh token needs to be updated
  const currentRefreshToken = savedUser.refresh_token?.token
  let refresh_token = currentRefreshToken
  const now = new Date()
  const refreshTokenExpiry = savedUser.refresh_token?.expiry_date
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000

  if (
    !currentRefreshToken ||
    (refreshTokenExpiry &&
      refreshTokenExpiry.getTime() - now.getTime() <= oneDayInMilliseconds)
  ) {
    refresh_token = await generateRefreshToken(savedUser._id.toHexString())
    await updateUser(savedUser._id.toHexString(), {
      refresh_token: {
        token: refresh_token,
        expiry_date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      },
    })
  }

  return apiResponse(res, HttpStatusCodes.OK, 'Login Succesfull', {
    access_token,
    refresh_token,
  })
}

export const handleLogoutUser: RequestHandler = async (req, res, next) => {
  const user = req.user
  if (!user) {
    throw new UserNotFoundError('User not found')
  }
  // Clear the refresh token
  await updateUser(user._id.toString(), {
    refresh_token: {
      expiry_date: null,
      token: null,
    },
  })

  return apiResponse(res, HttpStatusCodes.OK, 'Logout successful', null)
}

export const handleRefreshAccessToken: RequestHandler = async (
  req,
  res,
  next,
) => {
  const body: { refresh_token: string } = req.body

  // 1. verify refresh_token
  const payload = await verifyRefreshToken(body.refresh_token)
  const userId = payload.id

  // 2.check if userId exist with valid token
  const savedUser = await getUserById(userId)
  if (!savedUser) {
    throw new UserNotFoundError("Token user does't exist")
  }

  if (savedUser.refresh_token?.token !== body.refresh_token) {
    throw new TokenInvalidError('Provided token does not belong to user')
  }
  if (savedUser.refresh_token.expiry_date < new Date(Date.now())) {
    throw new TokenExpiredError('Token is expired')
  }

  // 3. generate access token
  const access_token = await generateAccessToken(savedUser._id.toHexString())

  // 4. Check if refresh token needs to be updated
  const currentRefreshToken = savedUser.refresh_token?.token
  let refresh_token = currentRefreshToken
  const now = new Date()
  const refreshTokenExpiry = savedUser.refresh_token?.expiry_date
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000

  if (
    !currentRefreshToken ||
    (refreshTokenExpiry &&
      refreshTokenExpiry.getTime() - now.getTime() <= oneDayInMilliseconds)
  ) {
    refresh_token = await generateRefreshToken(savedUser._id.toHexString())
    await updateUser(savedUser._id.toHexString(), {
      refresh_token: {
        token: refresh_token,
        expiry_date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      },
    })
  }
  return apiResponse(res, HttpStatusCodes.OK, 'Refreshed Tokens', {
    access_token,
    refresh_token,
  })
}

export const handleGetUserInfo: RequestHandler = async (req, res, next) => {
  const user = req.user

  return apiResponse(res, HttpStatusCodes.OK, 'Fetched user info', {
    user,
  })
}
