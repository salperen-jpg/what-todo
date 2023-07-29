import { StatusCodes } from "http-status-codes";

class CustomError extends Error {
  constructor(message) {
    super(message);
  }
}

class NotFound extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

class BadRequest extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class Unauthenticated extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

class Unauthorized extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export { CustomError, NotFound, BadRequest, Unauthorized, Unauthenticated };
