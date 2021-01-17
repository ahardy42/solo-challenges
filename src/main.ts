import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // static files
  app.use(express.static(join(__dirname, '..', 'client/build')));
  
  await app.listen(PORT);
}
bootstrap();
