import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3001,() => logger.log(`Example app listening on port ${process.env.PORT || 3001}!`));
}
bootstrap();
