import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import AppController from '../src/app.controller';
import AppModule from '../src/app.module';

describe('AppController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  const exec = () => {
    return request(app.getHttpServer()).get('/');
  };

  it('Should return 200 and Server running', async () => {
    const res = await exec();
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({});
    expect(res.text).toBe('Server running!');
  });

  afterAll(async () => {
    await app.close();
  });
});
