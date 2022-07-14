import Tree from '../entities/tree.entity';
import { ITreeResponseFormat } from '../entities/tree.interfaces';

/**
 * Return the tree using the response format requested by the front-end team.
 */
export const getTreeResponseFormat = (
  treeRoot: Tree[],
): ITreeResponseFormat[] => {
  return treeRoot.map((tree: Tree) => {
    return {
      [tree.id]: {
        label: tree.label,
        children: tree.children ? getTreeResponseFormat(tree.children) : [],
      },
    };
  });
};

/**
 * Transform an array of Tree nodes into a tree format.
 * Solution inspired by: https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript
 */
export const getTreeFormat = (list: Tree[]): Tree[] => {
  if (!list || list.length === 0) {
    return [];
  }
  const listWithChildren = list.map((item) =>
    Object.assign(item, { children: [] as Tree[] }),
  );
  const map = new Map<number, number>();
  const roots: Tree[] = [];

  for (const [index] of listWithChildren.entries()) {
    map.set(listWithChildren[index].id, index); // initialize the map
  }

  for (const tree of listWithChildren) {
    if (tree.parent && tree.parent.id !== 0) {
      listWithChildren[map.get(tree.parent.id)].children.push(tree);
    } else {
      roots.push(tree);
    }
  }
  return roots;
};
