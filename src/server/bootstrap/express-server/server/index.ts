import { Application } from 'express';
import cookieParser from 'cookie-parser';
import config from '@server/config';
import ServerTemplate from '@server/bootstrap/express-server/server-template';
import { IBootstrap } from '@server/bootstrap/interfaces';
const healthcheck = require('express-healthcheck');

class Server extends ServerTemplate implements IBootstrap {
  protected server: Application;

  constructor(
    server: Application,
    private readonly port: number = 3000,
    private readonly basePath = ''
  ) {
    super();
    this.server = server;
    this.server.set('port', this.port);
  }

  private setDevelopmentMiddlewares() {
    // eslint-disable-next-line no-empty
    if (!config.isProduction) {
    }
  }

  protected errorHandlers(): void {}

  protected setMiddlewares(): void {
    this.server.disable('x-powered-by');
    this.server.set('trust proxy', true);
    this.server.use(cookieParser());
    this.setDevelopmentMiddlewares();
  }

  protected setRoutes(): void {
    this.server.get(`${this.basePath}/health(check)?`, healthcheck());
  }
}

export default Server;
