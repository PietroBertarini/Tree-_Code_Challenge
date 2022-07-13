import { Injectable } from '@nestjs/common';

@Injectable()
export default class ApiService {
  getTree = (): string => {
    return 'Hello GET /tree/';
  };

  postTree = (): string => {
    return 'Hello POST /tree/';
  };
}
