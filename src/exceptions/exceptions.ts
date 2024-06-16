import { BaseHttpException } from '.'
import { ErrorCodes } from '../constants/errorCodes'

export class InternalServerError extends BaseHttpException {
  constructor(message = 'Internal Server Error', errors: any = null) {
    super(message, 500, ErrorCodes.INTERNAL_SERVER_ERROR, errors)
  }
}

export class BadRequestError extends BaseHttpException {
  constructor(message = 'Bad Request', errors: any = null) {
    super(message, 400, ErrorCodes.BAD_REQUEST, errors)
  }
}

export class NotFoundError extends BaseHttpException {
  constructor(message = 'Not Found', errors: any = null) {
    super(message, 404, ErrorCodes.NOT_FOUND, errors)
  }
}

export class UnauthorizedError extends BaseHttpException {
  constructor(message = 'Unauthorized', errors: any = null) {
    super(message, 401, ErrorCodes.UNAUTHORIZED, errors)
  }
}

export class ForbiddenError extends BaseHttpException {
  constructor(message = 'Forbidden', errors: any = null) {
    super(message, 403, ErrorCodes.FORBIDDEN, errors)
  }
}

export class ConflictError extends BaseHttpException {
  constructor(message = 'Conflict', errors: any = null) {
    super(message, 409, ErrorCodes.CONFLICT, errors)
  }
}

export class UnprocessableEntityError extends BaseHttpException {
  constructor(message = 'Unprocessable Entity', errors: any = null) {
    super(message, 422, ErrorCodes.UNPROCESSABLE_ENTITY, errors)
  }
}

export class ServiceUnavailableError extends BaseHttpException {
  constructor(message = 'Service Unavailable', errors: any = null) {
    super(message, 503, ErrorCodes.SERVICE_UNAVAILABLE, errors)
  }
}

// User-related Errors
export class UserNotFoundError extends BaseHttpException {
  constructor(message = 'User Not Found', errors: any = null) {
    super(message, 404, ErrorCodes.USER_NOT_FOUND, errors)
  }
}

export class UserAlreadyExistsError extends BaseHttpException {
  constructor(message = 'User Already Exists', errors: any = null) {
    super(message, 409, ErrorCodes.USER_ALREADY_EXISTS, errors)
  }
}

export class InvalidUserInputError extends BaseHttpException {
  constructor(message = 'Invalid User Input', errors: any = null) {
    super(message, 400, ErrorCodes.INVALID_USER_INPUT, errors)
  }
}

export class UserUnauthorizedError extends BaseHttpException {
  constructor(message = 'User Unauthorized', errors: any = null) {
    super(message, 401, ErrorCodes.USER_UNAUTHORIZED, errors)
  }
}

// Authentication & Authorization Errors
export class AuthenticationFailedError extends BaseHttpException {
  constructor(message = 'Authentication Failed', errors: any = null) {
    super(message, 401, ErrorCodes.AUTHENTICATION_FAILED, errors)
  }
}

export class TokenExpiredError extends BaseHttpException {
  constructor(message = 'Token Expired', errors: any = null) {
    super(message, 401, ErrorCodes.TOKEN_EXPIRED, errors)
  }
}

export class TokenInvalidError extends BaseHttpException {
  constructor(message = 'Token Invalid', errors: any = null) {
    super(message, 401, ErrorCodes.TOKEN_INVALID, errors)
  }
}

export class PermissionDeniedError extends BaseHttpException {
  constructor(message = 'Permission Denied', errors: any = null) {
    super(message, 403, ErrorCodes.PERMISSION_DENIED, errors)
  }
}

// Database Errors
export class DatabaseError extends BaseHttpException {
  constructor(message = 'Database Error', errors: any = null) {
    super(message, 500, ErrorCodes.DATABASE_ERROR, errors)
  }
}

export class DatabaseConnectionFailedError extends BaseHttpException {
  constructor(message = 'Database Connection Failed', errors: any = null) {
    super(message, 500, ErrorCodes.DATABASE_CONNECTION_FAILED, errors)
  }
}

export class DuplicateKeyError extends BaseHttpException {
  constructor(message = 'Duplicate Key Error', errors: any = null) {
    super(message, 409, ErrorCodes.DUPLICATE_KEY_ERROR, errors)
  }
}

export class RecordNotFoundError extends BaseHttpException {
  constructor(message = 'Record Not Found', errors: any = null) {
    super(message, 404, ErrorCodes.RECORD_NOT_FOUND, errors)
  }
}

// Validation Errors
export class ValidationError extends BaseHttpException {
  constructor(message = 'Validation Error', errors: any = null) {
    super(message, 400, ErrorCodes.VALIDATION_ERROR, errors)
  }
}

export class InvalidParametersError extends BaseHttpException {
  constructor(message = 'Invalid Parameters', errors: any = null) {
    super(message, 400, ErrorCodes.INVALID_PARAMETERS, errors)
  }
}

export class MissingParametersError extends BaseHttpException {
  constructor(message = 'Missing Parameters', errors: any = null) {
    super(message, 400, ErrorCodes.MISSING_PARAMETERS, errors)
  }
}

// External Service Errors
export class ExternalServiceError extends BaseHttpException {
  constructor(message = 'External Service Error', errors: any = null) {
    super(message, 502, ErrorCodes.EXTERNAL_SERVICE_ERROR, errors)
  }
}

export class ExternalServiceTimeoutError extends BaseHttpException {
  constructor(message = 'External Service Timeout', errors: any = null) {
    super(message, 504, ErrorCodes.EXTERNAL_SERVICE_TIMEOUT, errors)
  }
}

// File Errors
export class FileNotFoundError extends BaseHttpException {
  constructor(message = 'File Not Found', errors: any = null) {
    super(message, 404, ErrorCodes.FILE_NOT_FOUND, errors)
  }
}

export class FileUploadError extends BaseHttpException {
  constructor(message = 'File Upload Error', errors: any = null) {
    super(message, 500, ErrorCodes.FILE_UPLOAD_ERROR, errors)
  }
}

export class FileFormatUnsupportedError extends BaseHttpException {
  constructor(message = 'File Format Unsupported', errors: any = null) {
    super(message, 415, ErrorCodes.FILE_FORMAT_UNSUPPORTED, errors)
  }
}

// Rate Limiting Errors
export class TooManyRequestsError extends BaseHttpException {
  constructor(message = 'Too Many Requests', errors: any = null) {
    super(message, 429, ErrorCodes.TOO_MANY_REQUESTS, errors)
  }
}

// Payment Errors
export class PaymentFailedError extends BaseHttpException {
  constructor(message = 'Payment Failed', errors: any = null) {
    super(message, 402, ErrorCodes.PAYMENT_FAILED, errors)
  }
}

export class PaymentDeclinedError extends BaseHttpException {
  constructor(message = 'Payment Declined', errors: any = null) {
    super(message, 402, ErrorCodes.PAYMENT_DECLINED, errors)
  }
}


// Custom Application-specific Errors
export class CustomError extends BaseHttpException {
  constructor(message = 'Custom Error', errors: any = null) {
    super(message, 400, ErrorCodes.CUSTOM_ERROR, errors)
  }
}
