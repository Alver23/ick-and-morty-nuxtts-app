import http from 'http';
import express, { Application } from 'express';
import HttpServer from '@server/bootstrap/http-server';

jest.mock('http', () => {
  const httpModule = jest.requireActual('http');
  return {
    ...httpModule,
    createServer: jest.fn(() => ({
      listen: jest.fn(),
      on: jest.fn().mockImplementation((_name, cb) => cb(null, 'listening')),
    })),
  };
});

describe('HttpServer', () => {
  it('should create a server', async () => {
    const server: Application = express();
    const httpServer = new HttpServer(server, 5000);
    await httpServer.initialize();
    expect(http.createServer).toBeCalled();
  });
});
