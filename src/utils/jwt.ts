import jwt, {
  JsonWebTokenError,
  TokenExpiredError,
  VerifyErrors,
} from 'jsonwebtoken'
import { env } from '../config/config'
import { BaseHttpException } from '../exceptions'
import {
  CustomError,
  TokenExpiredError as GeneralTokenExpiredError,
  TokenInvalidError,
} from '../exceptions/exceptions'

const SECRET = env.AWS_ACCESS_KEY!

interface JwtPayload {
  id: string
}

interface DecodedToken {
  id: string
}

type JwtVerifyError = VerifyErrors | null

export const setjwt = async (userId: string): Promise<string> => {
  const payload: JwtPayload = {
    id: userId,
  }

  return await jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export const getjwt = async (
  token: string,
): Promise<DecodedToken | BaseHttpException> => {
  if (!token) {
    throw new TokenInvalidError('No Token is provided')
  }

  try {
    const decoded = (await jwt.verify(token, SECRET)) as DecodedToken
    return decoded
  } catch (error: any) {
    const e = error as JwtVerifyError

    if (e instanceof TokenExpiredError) {
      throw new GeneralTokenExpiredError('Your jwt token is expired')
    }

    if (e instanceof JsonWebTokenError) {
      throw new TokenInvalidError('Your jwt token is invalid')
    }

    throw new CustomError('Error while proccessing jwt')
  }
}
