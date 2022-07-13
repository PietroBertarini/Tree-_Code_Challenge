import { Controller, Get, Post } from '@nestjs/common';
import ApiService from './api.service';

@Controller()
export default class ApiController {
  constructor(private readonly appService: ApiService) {}

  @Get('/tree/')
  getTree(): string {
    return this.appService.getTree();
  }

  @Post('/tree/')
  postTree(): string {
    return this.appService.postTree();
  }
}
