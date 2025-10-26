import { HTTPSTATUS, HttpStatusCodeType } from "../config/http.config";

export const ErrorCodes = {
      ERR_INTERNAL: "ERR_INTERNAL",
      ERR_BAD_REQUEST: "ERR_BAD_REQUEST",
      ERR_UNAUTHORIZED: "ERR_UNAUTHORIZED",
      ERR_FORBIDDEN: "ERR_FORBIDDEN",
      ERR_NOT_FOUND: "ERR_NOT_FOUND"
} as const;
type ErrorCodeType = keyof typeof ErrorCodes;

export class AppError extends Error {
      constructor(
            message: string,
            public statusCode: HttpStatusCodeType = HTTPSTATUS.INTERNAL_SERVER_ERROR,
            public errorCode: ErrorCodeType = ErrorCodes.ERR_INTERNAL
      ) {
            super(message)
            Error.captureStackTrace(this, this.constructor)
      }
};

export class InternalServerException extends AppError {
      constructor(message: string = "Internal Server Error") {
            super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, ErrorCodes.ERR_INTERNAL)
      }
};

export class BadRequestException extends AppError {
      constructor(message: string = "Bad Request") {
            super(message, HTTPSTATUS.BAD_REQUEST, ErrorCodes.ERR_BAD_REQUEST)
      }
};

export class UnAuthorizedException extends AppError {
      constructor(message: string = "Unauthorized Access") {
            super(message, HTTPSTATUS.UNAUTHORIZED, ErrorCodes.ERR_UNAUTHORIZED)
      }
};

export class NotFoundException extends AppError {
      constructor(message: string = "Resource Not Found") {
            super(message, HTTPSTATUS.NOT_FOUND, ErrorCodes.ERR_NOT_FOUND)
      }
};