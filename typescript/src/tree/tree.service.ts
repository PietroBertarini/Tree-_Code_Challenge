import { Injectable } from '@nestjs/common';
import { ITreeResponseFormat } from './entities/tree.interfaces';
import { getTreeFormat, getTreeResponseFormat } from './utils/tree.utils';
import Tree from './entities/tree.entity';

import localStorage from '../../store';

@Injectable()
export default class TreeService {
  getTree = (): ITreeResponseFormat[] => {
    const getTreeFromDb = JSON.parse(
      localStorage.getItem('treeFromDb'),
    ) as Tree[];
    const tree = getTreeFormat(getTreeFromDb);
    return getTreeResponseFormat(tree);
  };

  postTree = (): string => {
    return 'Hello POST /tree/';
  };
}
