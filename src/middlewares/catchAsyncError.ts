import { Request, Response, NextFunction } from 'express'
import { BaseHttpException } from '../exceptions'
import { InternalServerError } from '../exceptions/exceptions'

type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>

export const catchAsyncError = (controller: ControllerFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next)
    } catch (err: any) {
      let exception: BaseHttpException
      if (err instanceof BaseHttpException) {
        exception = err
      } else {
        exception = new InternalServerError('Something Went wrong', err)
      }

      next(exception)
    }
  }
}
