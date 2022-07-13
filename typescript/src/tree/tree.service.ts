import { Injectable } from '@nestjs/common';
import { ITreeResponseFormat } from './entities/tree.interfaces';
import { getTreeFormat, getTreeResponseFormat } from './utils/tree.utils';
import Tree from './entities/tree.entity';

const logger = new Logger('TreeService');

@Injectable()
export default class TreeService {
  getTree = (): ITreeResponseFormat[] => {
    const getTreeFromDb = JSON.parse(
      localStorage.getItem('treeFromDb'),
    ) as Tree[];
    const tree = getTreeFormat(getTreeFromDb);
    return getTreeResponseFormat(tree);
  };

  createTree = async (newTree: CreateTreeDto): Promise<string> => {
    if (newTree && newTree.parent) {
      const parent = await this.getTreeById(newTree.parent);
      if (!parent) {
        throw new NotFoundException('Parent not found');
    }
    }
    const tree = await this.repository.createTree(newTree);
    logger.log(`Created tree with id ${tree.id}`);
    return `Tree: {id:${tree.id},label:${tree.label}}`;
  };
}
