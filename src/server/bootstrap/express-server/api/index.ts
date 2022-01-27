import cors from 'cors';
import { Application, json, urlencoded } from 'express';
import methodOverride from 'method-override';
import helmet from 'helmet';
import ServerTemplate from '@server/bootstrap/express-server/server-template';
import { IBootstrap } from '@server/bootstrap/interfaces';

class ApiServer extends ServerTemplate implements IBootstrap {
  protected server: Application;

  constructor(server: Application) {
    super();
    this.server = server;
  }

  protected errorHandlers(): void {}

  protected setMiddlewares(): void {
    this.server.use(cors());
    this.server.use(helmet());
    this.server.use(methodOverride());
    this.server.use(json());
    this.server.use(urlencoded({ extended: false }));
  }

  protected setRoutes(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.server.get('/products', (req, res) => {
      res.json({ data: [{ id: 1 }] });
    });
  }
}

export default ApiServer;
