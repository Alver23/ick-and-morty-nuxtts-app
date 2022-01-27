import { RequestHandler, ErrorRequestHandler } from 'express';

export interface IMiddleware {
  handler(params?: any): RequestHandler | ErrorRequestHandler;
}
