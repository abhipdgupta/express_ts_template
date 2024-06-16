import { NextFunction, Request, Response } from 'express'
import { BaseHttpException } from '../exceptions'

export const errorMiddleware = (
  err: BaseHttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err)

  return res.status(err.statusCode).json({
    message: err.message,
    status_code: err.statusCode,
    error_code: err.errorCode,
    errors: err.errors,
  })
}
