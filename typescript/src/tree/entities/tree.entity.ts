export default class Tree {
  // The id will be the ascending generated. So the parent will have a lower id than the children
  id: number;

  label: string;

  children?: Tree[];

  parent?: Tree;
}
