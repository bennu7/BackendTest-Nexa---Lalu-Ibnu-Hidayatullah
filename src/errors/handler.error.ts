import * as statusCode from "http-status";

export class HttpException extends Error {
  public status_code: number;
  public message: string;
  details?: any;

  constructor(status_code: number, message: string, details?: any) {
    super(message);
    this.status_code = status_code;
    this.message = message;
    this.details = details;
  }
}

export class HttpExceptionBadRequest extends HttpException {
  constructor(message: string) {
    super(statusCode.BAD_REQUEST, "BAD_REQUEST", message);
  }
}

export class HttpExceptionUnauthorize extends HttpException {
  constructor(message: string) {
    super(statusCode.UNAUTHORIZED, "UNAUTHORIZED", message);
  }
}

export class HttpExceptionNotFound extends HttpException {
  constructor(message: string) {
    super(statusCode.NOT_FOUND, "NOT_FOUND", message);
  }
}

export class HttpExceptionTooManyRequests extends HttpException {
  constructor(message: string) {
    super(statusCode.TOO_MANY_REQUESTS, "TOO_MANY_REQUEST", message);
  }
}

export class HttpExceptionForbidden extends HttpException {
  constructor(message: string) {
    super(statusCode.FORBIDDEN, "FORBIDDEN", message);
  }
}

export class HttpExceptionValidationError extends HttpException {
  constructor(message: string) {
    super(statusCode.UNPROCESSABLE_ENTITY, "UNPROCESSABLE_ENTITY", message);
  }
}
