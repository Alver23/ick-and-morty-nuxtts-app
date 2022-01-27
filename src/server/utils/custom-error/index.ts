import { StatusCodes, getReasonPhrase } from 'http-status-codes';

abstract class CustomError extends Error {
  constructor(
    public message: string,
    public code: string | number = getReasonPhrase(
      StatusCodes.INTERNAL_SERVER_ERROR
    ),
    public statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    public data: { [key: string]: any } = {}
  ) {
    super();
  }
}

export default CustomError;
