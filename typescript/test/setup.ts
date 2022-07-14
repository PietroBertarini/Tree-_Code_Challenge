import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';
import { Logger } from '@nestjs/common';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {
    const logger = new Logger();
    logger.log(err);
  }
});

global.afterEach(async () => {
  const conn = await getConnection();
  await conn.close();
});
