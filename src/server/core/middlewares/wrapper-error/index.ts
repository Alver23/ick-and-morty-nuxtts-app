import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { badImplementation, boomify } from '@hapi/boom';
import { IMiddleware } from '@server/core/middlewares/interfaces';
import CustomError from '@server/utils/custom-error';

class WrapperError implements IMiddleware {
  public handler(): ErrorRequestHandler {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    return (
      error: any,
      req: Request,
      res: Response,
      next: NextFunction
    ): void => {
      if (error instanceof CustomError) {
        next(boomify(error, { statusCode: error.statusCode }));
      }

      if (!error.isBoom) {
        next(badImplementation(error));
      }

      next(error);
    };
  }
}

export default new WrapperError();
