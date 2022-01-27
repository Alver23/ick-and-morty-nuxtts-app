import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '@server/config';
import { IMiddleware } from '@server/core/middlewares/interfaces';
import requestResponse from '@server/utils/request-reponse';

class ErrorHandler implements IMiddleware {
  private errorWithStack(error: any, stack: unknown) {
    const { statusCode, ...otherValues } = error;
    const response = requestResponse({
      status: statusCode,
      ...otherValues,
    });
    if (!config.isProduction) {
      return { ...response, stack };
    }
    return response;
  }

  public handler(): ErrorRequestHandler {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (error, req: Request, res: Response, next: NextFunction): void => {
      const {
        output: { statusCode, payload },
        stack,
        data,
      } = error;
      res
        .status(statusCode)
        .json(this.errorWithStack({ ...payload, data }, stack));
    };
  }
}

export default new ErrorHandler();
