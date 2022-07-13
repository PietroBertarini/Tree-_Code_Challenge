import { Controller, Get, Post } from '@nestjs/common';
import ApiService from './api.service';
import { INodeResponseFormat } from './entities/nodeData.interfaces';

@Controller()
export default class ApiController {
  constructor(private readonly appService: ApiService) {}

  @Get('/tree/')
  getTree(): INodeResponseFormat {
    return this.appService.getTree();
  }

  @Post('/tree/')
  postTree(): string {
    return this.appService.postTree();
  }
}
