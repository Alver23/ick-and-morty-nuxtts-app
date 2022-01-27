import express, { json } from 'express';

const basePath = '/api';
const fakeServer = express();
fakeServer.use(json());

export { fakeServer, basePath };
