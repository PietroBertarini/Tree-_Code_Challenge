import { InternalServerErrorException } from '@nestjs/common';
import Tree from './entities/tree.entity';
import CreateTreeDto from './dto/tree.dto';
import localStorage from '../../store';

export default class TreeRepository {
  getById = (id: number): Promise<Tree | undefined> => {
    try {
      const getTreeFromDb = JSON.parse(
        localStorage.getItem('treeFromDb'),
      ) as Tree[];
      const foundTree = getTreeFromDb.find((tree) => tree.id === id);
      return Promise.resolve(foundTree);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };

  get = (): Promise<Tree[]> => {
    try {
      const getTreeFromDb = JSON.parse(
        localStorage.getItem('treeFromDb'),
      ) as Tree[];
      return Promise.resolve(getTreeFromDb);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };

  createTree = (createTreeDto: CreateTreeDto): Promise<Tree> => {
    try {
      // this part is simulating the DB FK
      const getTreeFromDb = JSON.parse(
        localStorage.getItem('treeFromDb'),
      ) as Tree[];
      const parentTree =
        createTreeDto.parent !== undefined
          ? getTreeFromDb.find((tree) => tree.id === createTreeDto.parent)
          : undefined;

      const tree = {
        id: 10,
        parent: parentTree,
        label: createTreeDto.label,
      } as Tree;
      getTreeFromDb.push(tree);
      // this part is simulating the DB
      localStorage.setItem('treeFromDb', JSON.stringify(getTreeFromDb));

      return Promise.resolve(tree);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };
}
