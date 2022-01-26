import 'module-alias/register';
import express from 'express';
import nuxtConfig from './../../nuxt.config';
import ExpressServer from '@server/bootstrap/express-server/server';
import HttpServer from '@server/bootstrap/http-server';
import config from '@server/config';
import { normalizePort } from '@server/bootstrap/http-server/utils';
import { Nuxt, Builder } from 'nuxt';

const port: number = normalizePort(config.port as string) as number;

const start = async () => {
  try {
    const nuxt = new Nuxt(nuxtConfig);
    const expressServer = new ExpressServer(express(), port);
    const server = await expressServer.initialize();
    const httpServer = new HttpServer(server, port);
    if (nuxtConfig.dev) {
      const builder = new Builder(nuxt);
      builder.build();
    }
    server.use(nuxt.render);
    await httpServer.initialize();
  } catch (e) {
    process.exit(1);
  }
};

start();
