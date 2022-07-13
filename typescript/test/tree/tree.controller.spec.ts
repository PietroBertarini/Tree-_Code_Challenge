import { Test, TestingModule } from '@nestjs/testing';
import { TreeRepository } from 'typeorm';
import TreeController from '../../src/tree/tree.controller';
import TreeService from '../../src/tree/tree.service';
import expectedResponseTree from './tree.mock';

describe('AppController', () => {
  let apiController: TreeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TreeController],
      providers: [TreeService],
    }).compile();
    apiController = app.get<TreeController>(TreeController);
  });

  describe('Tree route', () => {
    it('should return GET /tree/"', async () => {
      const response = await apiController.getTree();
      expect(response).toStrictEqual(expectedResponseTree);
    });
    it('should return POST /tree/"', () => {
      expect(apiController.postTree()).toBe('Hello POST /tree/');
    });
  });
});
