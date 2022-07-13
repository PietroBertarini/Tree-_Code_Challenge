import { Injectable } from '@nestjs/common';
import { treeMock } from './entities/tree.mock';
import { ITreeResponseFormat } from './entities/tree.interfaces';
import { getTreeResponseFormat } from './utils/tree.utils';

@Injectable()
export default class TreeService {
  getTree = (): ITreeResponseFormat => {
    return getTreeResponseFormat(treeMock);
  };

  postTree = (): string => {
    return 'Hello POST /tree/';
  };
}
