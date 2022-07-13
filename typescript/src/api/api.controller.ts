import { Controller, Get, Post } from '@nestjs/common';
import ApiService from './api.service';
import { IResponseNode } from './entities/nodeData.interfaces';

@Controller()
export default class ApiController {
  constructor(private readonly appService: ApiService) {}

  @Get('/tree/')
  getTree(): IResponseNode {
    return this.appService.getTree();
  }

  @Post('/tree/')
  postTree(): string {
    return this.appService.postTree();
  }
}
