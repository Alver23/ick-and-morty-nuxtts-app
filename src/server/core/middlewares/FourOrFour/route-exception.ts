import { notFound } from '@hapi/boom';
import CustomError from '@server/utils/custom-error';

class RouteNotFoundException extends CustomError {
  constructor(originalUrl: string) {
    const {
      output: { statusCode },
    } = notFound();
    super(`Route '${originalUrl}' does not exist.`, statusCode, statusCode);
  }
}

export default RouteNotFoundException;
