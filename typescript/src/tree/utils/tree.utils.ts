import Tree from '../entities/tree.entity';
import { ITreeResponseFormat } from '../entities/tree.interfaces';

export const getTreeResponseFormat = (item: Tree): ITreeResponseFormat => {
  return {
    [item.id]: {
      label: item.label,
      children: item.children
        ? item.children.map((itemResponse) =>
            getTreeResponseFormat(itemResponse),
          )
        : [],
    },
  };
};

export const getTreeFormat = (item: Tree[]): Tree | undefined => {
  if (item.length === 0) {
    return undefined;
  }
  return undefined;
};
