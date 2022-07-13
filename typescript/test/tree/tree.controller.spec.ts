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
    it('should return GET /tree/"', async () => {
      const response = await apiController.getTree();
      expect(response).toStrictEqual(expectedResponseTree);
    });
    it('should create a new tree with a parent', async () => {
      const response = await apiController.postTree({
        label: 'test',
        parent: 1,
      });
      expect(response).toContain(`Tree:`);
      expect(response).toContain(`label:test`);
    });
    it('should a new tree with without a parent', async () => {
      const response = await apiController.postTree({ label: 'test' });
      expect(response).toContain(`Tree:`);
      expect(response).toContain(`label:test`);
    });
  });
});
