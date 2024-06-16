import jwt, {
  JsonWebTokenError,
  TokenExpiredError as JwtTokenExpiredError,
} from 'jsonwebtoken'
import { env } from '../config/config'
import {
  TokenExpiredError,
  TokenInvalidError,
} from '../exceptions/exceptions'

interface JwtPayload {
  id: string
}

interface DecodedToken {
  id: string
}

export const generateAccessToken = async (userId: string) => {
  try {
    const payload: JwtPayload = {
      id: userId,
    }

    return await jwt.sign(payload, env.ACCESS_TOKEN_SECRET!, {
      expiresIn: '1d',
      algorithm: 'HS256',
    })
  } catch (error) {
    const e = error

    if (e instanceof JwtTokenExpiredError) {
      throw new TokenExpiredError('Your jwt token is expired')
    }

    if (e instanceof JsonWebTokenError) {
      throw new TokenInvalidError('Your jwt token is invalid')
    }

    throw error
  }
}

export const generateRefreshToken = async (userId: string) => {
  try {
    const payload: JwtPayload = {
      id: userId,
    }

    // Its expiration is mainted in database
    return await jwt.sign(payload, env.REFRESH_TOKEN_SECRET!, {
      algorithm: 'HS256',
    })
  } catch (error) {
    const e = error

    if (e instanceof JwtTokenExpiredError) {
      throw new TokenExpiredError('Your jwt token is expired')
    }

    if (e instanceof JsonWebTokenError) {
      throw new TokenInvalidError('Your jwt token is invalid')
    }

    throw error
  }
}

export const verifyAccessToken = async (token: string) => {
  if (!token) {
    throw new TokenInvalidError('No Token is provided')
  }

  try {
    const decoded = (await jwt.verify(
      token,
      env.ACCESS_TOKEN_SECRET!,
    )) as DecodedToken
    return decoded
  } catch (error: any) {
    const e = error

    if (e instanceof JwtTokenExpiredError) {
      throw new TokenExpiredError('Your jwt token is expired')
    }

    if (e instanceof JsonWebTokenError) {
      throw new TokenInvalidError('Your jwt token is invalid')
    }

    throw error
  }
}

export const verifyRefreshToken = async (token: string) => {
  if (!token) {
    throw new TokenInvalidError('No Token is provided')
  }

  try {
    const decoded = (await jwt.verify(
      token,
      env.REFRESH_TOKEN_SECRET!,
    )) as DecodedToken
    return decoded
  } catch (error: any) {
    const e = error

    if (e instanceof JwtTokenExpiredError) {
      throw new TokenExpiredError('Your jwt token is expired')
    }

    if (e instanceof JsonWebTokenError) {
      throw new TokenInvalidError('Your jwt token is invalid')
    }

    throw error
  }
}
