import supertest from 'supertest';
import express, { Application } from 'express';
import { IBootstrap } from '@server/bootstrap/interfaces';
import ApiServer from '@server/bootstrap/express-server/api/index';

describe('ApiServer', () => {
  const application: Application = express();
  const apiServer: IBootstrap = new ApiServer(application);

  it('should start a server', async () => {
    const apiServerInstance = await apiServer.initialize();

    const response: any = await supertest(apiServerInstance)
      .get('/products')
      .set('Accept', 'application/json');
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
  });
});
