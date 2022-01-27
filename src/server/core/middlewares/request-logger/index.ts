import debug from 'debug';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import config from '@server/config';
import { IMiddleware } from '@server/core/middlewares/interfaces';

const logger = debug(`${config.appName}:request-logger`);

class RequestLogger implements IMiddleware {
  handler(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      res.on('finish', () => {
        const { method, originalUrl } = req;
        const { statusCode, statusMessage } = res;
        logger(`${method} ${originalUrl} - ${statusCode} ${statusMessage}`);
      });
      next();
    };
  }
}

export default new RequestLogger();
