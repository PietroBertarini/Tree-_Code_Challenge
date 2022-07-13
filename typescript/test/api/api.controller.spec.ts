import { Test, TestingModule } from '@nestjs/testing';
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
    it('should return GET /tree/"', () => {
      expect(apiController.getTree()).toStrictEqual(expectedResponseTree);
    });
    it('should return POST /tree/"', () => {
      expect(apiController.postTree()).toBe('Hello POST /tree/');
    });
  });
});
