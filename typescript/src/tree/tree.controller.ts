import { Body, Controller, Get, Post } from '@nestjs/common';
import TreeService from './tree.service';
import { ITreeResponseFormat } from './entities/tree.interfaces';
import CreateTreeDto from './dto/tree.dto';

@Controller()
export default class TreeController {
  constructor(private readonly appService: TreeService) {}

  @Get('/tree/')
  getTree(): Promise<ITreeResponseFormat[]> {
    return this.appService.getTree();
  }

  @Post('/tree/')
  postTree(@Body() body: CreateTreeDto): Promise<string> {
    return this.appService.createTree(body);
  }
}
