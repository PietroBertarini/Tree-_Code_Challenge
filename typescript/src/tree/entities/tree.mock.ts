import Tree from './tree.entity';

export const treeMock: Tree = {
  id: 1,
  label: 'root',
  children: [
    { id: 2, label: 'ant' },
    {
      id: 3,
      label: 'bear',
      children: [
        { id: 4, label: 'cat' },
        { id: 5, label: 'dog', children: [{ id: 6, label: 'elephant' }] },
      ],
    },
    { id: 7, label: 'frog' },
  ],
};

export const initialFakeDb: Tree[] = [
  {
    id: 1,
    label: 'root',
  },
  {
    id: 2,
    label: 'ant',
    parent: {
      id: 1,
      label: 'root',
    },
  },
  {
    id: 3,
    label: 'bear',
    parent: {
      id: 1,
      label: 'root',
    },
  },
  {
    id: 4,
    label: 'cat',
    parent: {
      id: 3,
      label: 'bear',
    },
  },
  {
    id: 5,
    label: 'dog',
    parent: {
      id: 3,
      label: 'bear',
    },
  },
  {
    id: 6,
    label: 'elephant',
    parent: {
      id: 5,
      label: 'dog',
    },
  },
  {
    id: 7,
    label: 'frog',
    parent: {
      id: 1,
      label: 'root',
    },
  },
];
