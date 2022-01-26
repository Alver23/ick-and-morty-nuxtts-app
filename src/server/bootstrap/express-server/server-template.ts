import { Application } from 'express';

abstract class ServerTemplate {
  protected abstract server: Application;

  protected abstract errorHandlers(): void;

  protected abstract setMiddlewares(): void;

  protected abstract setRoutes(): void;

  initialize(): Promise<Application> {
    this.setMiddlewares();
    this.setRoutes();
    this.errorHandlers();
    return Promise.resolve(this.server);
  }
}

export default ServerTemplate;
