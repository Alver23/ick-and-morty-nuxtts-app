import { StatusCodes } from 'http-status-codes';
import { IRequestResponse } from '@server/utils/request-reponse/interfaces';

const requestResponse = ({
  message,
  data,
  status,
  options,
}: IRequestResponse): IRequestResponse => {
  let statusCode = StatusCodes.OK;
  let additionalOptions: any = {};
  if (status) {
    statusCode = status;
  }

  if (options) {
    additionalOptions = options;
  }
  return {
    message,
    status: statusCode,
    data,
    ...additionalOptions,
  };
};

export default requestResponse;
