import { Controller, Get, Post } from '@nestjs/common';
import TreeService from './tree.service';
import { ITreeResponseFormat } from './entities/tree.interfaces';

@Controller()
export default class TreeController {
  constructor(private readonly appService: TreeService) {}

  @Get('/tree/')
  getTree(): ITreeResponseFormat[] {
    return this.appService.getTree();
  }

  @Post('/tree/')
  postTree(): string {
    return this.appService.postTree();
  }
}
