import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import ApiModule from '../../src/api/api.module';
import expectedResponseTree from './nodeData.mock';

describe('ApiController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });
  describe('GET /tree/', () => {
    const exec = () => {
      return request(app.getHttpServer()).get('/api/tree/');
    };

    it('Should return 200 and Hello', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.text).toStrictEqual(JSON.stringify(expectedResponseTree));
    });
  });

  describe('POST /tree/', () => {
    const exec = () => {
      return request(app.getHttpServer()).post('/api/tree/');
    };

    it('Should return 201 and Hello post', async () => {
      const res = await exec();
      expect(res.status).toBe(201);
      expect(res.body).toStrictEqual({});
      expect(res.text).toBe('Hello POST /tree/');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
