import { Body, Controller, Get, Post } from '@nestjs/common';
import TreeService from './tree.service';
import { ITreeResponseFormat } from './entities/tree.interfaces';
import CreateTreeDto from './dto/tree.dto';

@Controller()
export default class TreeController {
  constructor(private readonly appService: TreeService) {}

  /**
   * GET all tree from the DB, the tree will be generated from the root (Data without parent).
   */
  @Get('/tree/')
  getTree(): Promise<ITreeResponseFormat[]> {
    return this.appService.getAllTree();
  }

  /**
   * CREATE a new tree node to the DB
   */
  @Post('/tree/')
  postTree(@Body() body: CreateTreeDto): Promise<string> {
    return this.appService.createTree(body);
  }
}
