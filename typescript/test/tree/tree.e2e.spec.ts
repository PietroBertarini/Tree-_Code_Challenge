import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TreeModule from '../../src/tree/tree.module';
import expectedResponseTree from './tree.mock';
import localStorage from '../../store';
import { initialFakeDb } from '../../src/tree/entities/tree.mock';

describe('ApiController', () => {
  let app: INestApplication;
  beforeEach(() => {
    localStorage.setItem('treeFromDb', JSON.stringify(initialFakeDb));
  });
  afterEach(async () => {
    localStorage.setItem('treeFromDb', JSON.stringify(initialFakeDb));
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

    it('Should return 200 and the response tree', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.text).toStrictEqual(JSON.stringify(expectedResponseTree));
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

    it('Should return 400, no body', async () => {
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Bad Request');
    });
    it('Should return 201', async () => {
      label = 'test';
      const res = await exec();
      expect(res.status).toBe(201);
      expect(res.text).toContain(`Tree:`);
      expect(res.text).toContain(`label:test`);
    });

    it('Should return 201, with parent', async () => {
      label = 'test';
      parent = 1;
      const res = await exec();
      expect(res.status).toBe(201);
      expect(res.text).toContain(`Tree:`);
      expect(res.text).toContain(`label:test`);
    });

    it('Should return 201, wrong parent format', async () => {
      label = 'test';
      parent = 'test';
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Bad Request');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
