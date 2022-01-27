import { Response } from 'express';

export interface IResponseJson extends Response {
  responseJson: (params: any) => void;
}
