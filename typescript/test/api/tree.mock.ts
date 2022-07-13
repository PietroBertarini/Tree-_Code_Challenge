import { ITreeResponseFormat } from '../../src/tree/entities/tree.interfaces';

const expectedMockTreeResponse: ITreeResponseFormat = {
  1: {
    label: 'root',
    children: [
      { 2: { label: 'ant', children: [] } },
      {
        3: {
          label: 'bear',
          children: [
            { 4: { label: 'cat', children: [] } },
            {
              5: {
                label: 'dog',
                children: [{ 6: { label: 'elephant', children: [] } }],
              },
            },
          ],
        },
      },
      { 7: { label: 'frog', children: [] } },
    ],
  },
};

export default expectedMockTreeResponse;
