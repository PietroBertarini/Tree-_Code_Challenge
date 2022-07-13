import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import TreeController from './tree.controller';
import TreeService from './tree.service';
import TreeRepository from './tree.repository';

@Module({
  imports: [TreeRepository],
  controllers: [TreeController],
  providers: [
    TreeService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export default class TreeModule {}
