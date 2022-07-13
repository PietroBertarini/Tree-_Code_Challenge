import NodeData from './nodeData.entity';

const treeMock: NodeData = {
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

export default treeMock;
