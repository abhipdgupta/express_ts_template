export class BaseHttpException extends Error {
  public statusCode: number
  public errorCode: number
  public errors: any

  constructor(
    message: string,
    statusCode: number,
    errorCode: number,
    errors: any,
  ) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
    this.errors = errors

    Error.captureStackTrace(this, this.constructor)
  }
}
