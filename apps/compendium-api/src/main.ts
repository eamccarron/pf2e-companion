/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app/app.module';

async function bootstrap() {
  console.log(
    'Using mongoDB at: ',
    process.env['DB_HOST'],
    ':',
    process.env['DB_PORT']
  );

  console.log(process.env);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );
  const port = process.env.PORT || 3000;
  await app.listen(port, process.env['ADDRESS'] ?? 'localhost');
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
