import { Request, Response, NextFunction, RequestHandler } from 'express'
import { BaseHttpException } from '../exceptions'
import { InternalServerError } from '../exceptions/exceptions'

export const catchAsyncError = (controller: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next)
    } catch (err: any) {
      let exception: BaseHttpException

      if (err instanceof BaseHttpException) {
        exception = err
      } else {
        exception = new InternalServerError('Something Went wrong', err.message)
      }

      next(exception)
    }
  }
}
