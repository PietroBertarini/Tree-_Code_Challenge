import { Injectable } from '@nestjs/common';
import mockTree from './entities/nodeData.mock';
import { INodeResponseFormat } from './entities/nodeData.interfaces';
import getNodeResponseFormat from './utils/nodeData.utils';

@Injectable()
export default class ApiService {
  getTree = (): INodeResponseFormat => {
    return getNodeResponseFormat(mockTree);
  };

  postTree = (): string => {
    return 'Hello POST /tree/';
  };
}
