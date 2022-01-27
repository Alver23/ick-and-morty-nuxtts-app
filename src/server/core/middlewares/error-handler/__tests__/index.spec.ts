import supertest from 'supertest';
import { notFound } from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import { fakeServer } from '@server/__mocks__/fake-server';
import config from '@server/config';
import ErrorHandler from '@server/core/middlewares/error-handler/index';

jest.mock('@server/config', () => jest.fn());

describe('ErrorHandler', () => {
  fakeServer.get(
    '/users',
    (req: Request, res: Response, next: NextFunction) => {
      ErrorHandler.handler()(notFound(), req, res, next);
    }
  );

  const cases = [[true], [false]];

  it.each(cases)(
    'should return an error when isProduction is to equal %s',
    async (value) => {
      config.isProduction = value;
      const response = await supertest(fakeServer).get('/users');
      expect(response.status).toEqual(404);
    }
  );
});
