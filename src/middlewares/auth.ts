import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError, UserNotFoundError } from '../exceptions/exceptions'
import { verifyAccessToken } from '../services/tokenService'
import { getUserById } from '../services/userService'
import { UserRoles } from '../constants/userRoles'
import IUser from '../types/user'

const extractAuthorizationToken = (req: Request) => {
  const headerToken = req.headers.authorization

  if (!headerToken) throw new UnauthorizedError('No access token provided')

  const token = headerToken.split(' ')[1]
  if (!token) throw new UnauthorizedError('Authorization header is empty')

  return token
}

export const requireAdminAccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const access_token = extractAuthorizationToken(req)

    const decodedToken = await verifyAccessToken(access_token)

    const user = await getUserById(decodedToken.id)

    if (!user) {
      throw new UserNotFoundError('User does not exist')
    }

    if (user.role !== UserRoles.ADMIN) {
      throw new UnauthorizedError('Only Admins allowed')
    }

    req.user = user.toObject()

    next()
  } catch (error) {
    throw error
  }
}

export const requireUserAccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const access_token = extractAuthorizationToken(req)

    const decodedToken = await verifyAccessToken(access_token)

    const user = await getUserById(decodedToken.id)

    if (!user) {
      throw new UserNotFoundError('User does not exist')
    }

    if (user.role !== UserRoles.USER) {
      throw new UnauthorizedError('Only User allowed')
    }

    req.user = user.toObject()

    next()
  } catch (error) {
    next(error)
  }
}

export const requireValidUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const access_token = extractAuthorizationToken(req)

    const decodedToken = await verifyAccessToken(access_token)

    const user = await getUserById(decodedToken.id)

    if (!user) {
      throw new UserNotFoundError('User does not exist')
    }

    req.user = user.toObject()

    next()
  } catch (error) {
    next(error)
  }
}
