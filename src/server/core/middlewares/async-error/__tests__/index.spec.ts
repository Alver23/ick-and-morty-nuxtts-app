import supertest from 'supertest';
import { Request, Response } from 'express';
import { fakeServer } from '@server/__mocks__/fake-server';
import AsyncError from '@server/core/middlewares/async-error/index';

describe('AsyncError', () => {
  fakeServer.get(
    '/users',
    AsyncError.handler((_: Request, res: Response) => {
      res.status(200).json({ name: 'response' });
    })
  );

  fakeServer.get(
    '/error',
    AsyncError.handler(() => {
      throw new Error('fake error');
    })
  );

  it('should execute the callback correctly', async () => {
    const response = await supertest(fakeServer)
      .get('/users')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
  });

  it('should return error', async () => {
    const response = await supertest(fakeServer)
      .get('/error')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(500);
  });
});
