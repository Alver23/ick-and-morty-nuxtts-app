import supertest from 'supertest';
import express, { Application } from 'express';
import ExpressServer from '../index';
import { IBootstrap } from '@server/bootstrap/interfaces';

describe('ExpressServer', () => {
  const application: Application = express();
  const expressServer: IBootstrap = new ExpressServer(application);

  it('should start a server', async () => {
    const server = await expressServer.initialize();
    const response: any = await supertest(server)
      .get('/health')
      .set('Accept', 'application/json');
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
  });
});
