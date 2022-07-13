import { Injectable } from '@nestjs/common';
import mockTree from './entities/nodeData.mock';
import { IResponseNode } from './entities/nodeData.interfaces';
import getResponseFormat from './utils/nodeData.utils';

@Injectable()
export default class ApiService {
  getTree = (): IResponseNode => {
    return getResponseFormat(mockTree);
  };

  postTree = (): string => {
    return 'Hello POST /tree/';
  };
}
