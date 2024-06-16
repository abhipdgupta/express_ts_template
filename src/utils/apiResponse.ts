import { Response } from 'express'
import HttpStatusCodes from '../constants/httpStatusCodes'

export const apiResponse = (
  res: Response,
  status_code: HttpStatusCodes,
  message: string,
  data: unknown,
) => {
  res.status(status_code).json({
    success: true,
    status_code,
    message,
    data,
  })
}
