import { Test, TestingModule } from '@nestjs/testing';
import { TreeRepository } from 'typeorm';
import TreeController from '../../src/tree/tree.controller';
import TreeService from '../../src/tree/tree.service';
import expectedResponseTree from './tree.mock';

const mockTreeRepository = () => ({
  get: jest.fn(),
  createTree: jest.fn(),
  gerById: jest.fn(),
});

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
    it('should create a new tree with a parent', () => {
      const response = apiController.postTree({ label: 'test', parent: 1 });
      expect(response).toBe(`Tree: {id:10,label:test}`);
    });
    it('should a new tree with without a parent', () => {
      const response = apiController.postTree({ label: 'test' });
      expect(response).toBe(`Tree: {id:10,label:test}`);
    });
  });
});
