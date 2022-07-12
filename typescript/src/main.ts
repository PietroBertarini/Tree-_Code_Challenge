import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import AppModule from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3001, () =>
    logger.log(`Example app listening on port ${process.env.PORT || 3001}!`),
  );
}
bootstrap();
