import { NextFunction, Request, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import requestResponse from '@server/utils/request-reponse';
import { IResponseJson } from '@server/core/middlewares/response-json/interfaces';
import { IMiddleware } from '@server/core/middlewares/interfaces';

class ResponseToJson implements IMiddleware {
  handler(): RequestHandler {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (req: Request, res: IResponseJson, next: NextFunction): void => {
      res.responseJson = ({ data, message, status, options }: any): void => {
        res
          .status(status || StatusCodes.OK)
          .json(requestResponse({ data, message, status, options }));
      };
      next();
    };
  }
}

export default new ResponseToJson();
