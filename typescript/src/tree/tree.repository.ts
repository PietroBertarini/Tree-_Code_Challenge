import Tree from './entities/tree.entity';
import CreateTreeDto from './dto/tree.dto';
import localStorage from '../../store';

export default class TreeRepository {
  getById = (id: number): Promise<Tree | undefined> => {
    const getTreeFromDb = JSON.parse(
      localStorage.getItem(process.env.FAKE_DB_NAME),
    ) as Tree[];
    const foundTree = getTreeFromDb.find((tree) => tree.id === id);
    return Promise.resolve(foundTree);
  };

  get = (): Promise<Tree[]> => {
    const getTreeFromDb = JSON.parse(
      localStorage.getItem(process.env.FAKE_DB_NAME),
    ) as Tree[];
    return Promise.resolve(getTreeFromDb);
  };

  createTree = (createTreeDto: CreateTreeDto): Promise<Tree> => {
    // this part is simulating the DB FK
    const getTreeFromDb = JSON.parse(
      localStorage.getItem(process.env.FAKE_DB_NAME),
    ) as Tree[];
    const parentTree =
      createTreeDto.parent !== undefined
        ? getTreeFromDb.find((tree) => tree.id === createTreeDto.parent)
        : undefined;

    const tree = {
      id: new Date().valueOf(),
      parent: parentTree,
      label: createTreeDto.label,
    } as Tree;
    getTreeFromDb.push(tree);
    // this part is simulating the DB
    localStorage.setItem(
      process.env.FAKE_DB_NAME,
      JSON.stringify(getTreeFromDb),
    );

    return Promise.resolve(tree);
  };
}
