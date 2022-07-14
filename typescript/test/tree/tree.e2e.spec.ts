import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TreeModule from '../../src/tree/tree.module';
import {
  expectedMockTreeResponse,
  expectedResponseEndTest,
  expectedResponseMiddleTest,
  expectedResponseRootTest,
} from './tree.mock';
import localStorage from '../../store';
import { initialFakeDb } from '../../src/tree/entities/tree.mock';

describe('ApiController', () => {
  let app: INestApplication;
  beforeEach(() => {
    localStorage.setItem(
      process.env.FAKE_DB_NAME,
      JSON.stringify(initialFakeDb),
    );
  });
  afterEach(async () => {
    localStorage.setItem(
      process.env.FAKE_DB_NAME,
      JSON.stringify(initialFakeDb),
    );
  });
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TreeModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });
  describe('GET /tree/', () => {
    const exec = () => {
      return request(app.getHttpServer()).get('/tree/');
    };

    it('Status 200 and match response tree', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.text).toStrictEqual(JSON.stringify(expectedMockTreeResponse));
    });

    it('Status 200 and empty tree', async () => {
      localStorage.setItem(process.env.FAKE_DB_NAME, JSON.stringify([]));
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.text).toStrictEqual(JSON.stringify([]));
    });
  });

  describe('POST /tree/', () => {
    let label;
    let parent;
    const exec = () => {
      return request(app.getHttpServer())
        .post('/tree/')
        .send({ label, parent });
    };

    it('Status 400 - no body', async () => {
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Bad Request');
    });
    it('Status 201 - Tree created', async () => {
      label = 'test';
      const res = await exec();
      expect(res.status).toBe(201);
      expect(res.text).toContain(`Tree:`);
      expect(res.text).toContain(`label:test`);
    });

    it('Status 201 - Tree with parent created', async () => {
      label = 'test';
      parent = 1;
      const res = await exec();
      expect(res.status).toBe(201);
      expect(res.text).toContain(`Tree:`);
      expect(res.text).toContain(`label:test`);
    });

    it('Status 400 - Wrong parent format', async () => {
      label = 'test';
      parent = 'test';
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Bad Request');
    });

    it('Status 404 - parent not found', async () => {
      label = 'test';
      parent = 123;
      const res = await exec();
      expect(res.status).toBe(404);
      expect(res.body.message).toContain('Tree not found');
      expect(res.body.error).toBe('Not Found');
    });
  });

  describe('POST persistence', () => {
    let label;
    let parent;
    const postExec = () => {
      return request(app.getHttpServer())
        .post('/tree/')
        .send({ label, parent });
    };
    const getExec = () => {
      return request(app.getHttpServer()).get('/tree/');
    };

    it('New tree at root (without parent)', async () => {
      label = 'test';
      jest.useFakeTimers('modern').setSystemTime(new Date(32));
      await postExec();
      const res = await getExec();
      expect(res.status).toBe(200);
      expect(res.text).toStrictEqual(JSON.stringify(expectedResponseRootTest));
    });

    it('New tree in the middle of the tree', async () => {
      label = 'test';
      parent = 5;
      jest.useFakeTimers('modern').setSystemTime(new Date(32));
      await postExec();
      const res = await getExec();
      expect(res.status).toBe(200);
      expect(res.text).toStrictEqual(
        JSON.stringify(expectedResponseMiddleTest),
      );
    });

    it('New tree in the end of the tree', async () => {
      label = 'test';
      parent = 6;
      jest.useFakeTimers('modern').setSystemTime(new Date(32));
      await postExec();
      const res = await getExec();
      expect(res.status).toBe(200);
      expect(res.text).toStrictEqual(JSON.stringify(expectedResponseEndTest));
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
