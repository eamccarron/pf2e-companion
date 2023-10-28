import { createRequestHandler } from '@remix-run/express';
import { broadcastDevReady } from '@remix-run/node';
import express from 'express';

// @ts-ignore this will be created automatically by remix build
import * as build from '../build/index.js';

const app = express();
app.use(express.static(''));

app.all('*', createRequestHandler({ build }));

app.listen(process.env.PORT || 4200, () => {
  if (process.env.NODE_ENV === 'development') {
    broadcastDevReady(build);
  }
});
