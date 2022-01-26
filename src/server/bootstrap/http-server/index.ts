// Dependencies
import http from 'http';
import debug from 'debug';
import { Application } from 'express';

// Config
import config from '@server/config';

// Interfaces
import { IBootstrap } from '@server/bootstrap/interfaces';

// Utils
import { onError, onListening } from '@server/bootstrap/http-server/utils';

class HttpServer implements IBootstrap {
  private readonly debug;

  constructor(
    private readonly server: Application,
    private readonly port: number
  ) {
    this.debug = debug(`${config.appName}:http-server`);
    this.debugLog = this.debugLog.bind(this);
  }

  private debugLog(log: string): void {
    this.debug(log);
  }

  initialize(): Promise<string> {
    return new Promise((resolve, reject) => {
      const httpServer: http.Server = http.createServer(this.server);
      httpServer.listen(this.port);
      httpServer.on('listening', () => {
        onListening(this.debugLog);
        resolve('');
      });
      httpServer.on('error', (error) => {
        onError(error, this.debugLog);
        reject(error);
      });
    });
  }
}

export default HttpServer;
