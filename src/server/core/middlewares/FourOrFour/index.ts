import { NextFunction, Request, RequestHandler, Response } from 'express';
import RouteNotFoundException from '@server/core/middlewares/FourOrFour/route-exception';
import { IMiddleware } from '@server/core/middlewares/interfaces';

class FourOrFour implements IMiddleware {
  handler(): RequestHandler {
    return (req: Request, _: Response, next: NextFunction) => {
      next(new RouteNotFoundException(req.originalUrl));
    };
  }
}

export default new FourOrFour();
