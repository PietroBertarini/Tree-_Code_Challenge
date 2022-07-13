import NodeData from '../entities/nodeData.entity';
import { INodeResponseFormat } from '../entities/nodeData.interfaces';

const getNodeResponseFormat = (item: NodeData): INodeResponseFormat => {
  return {
    [item.id]: {
      label: item.label,
      children: item.children
        ? item.children.map((itemResponse) =>
            getNodeResponseFormat(itemResponse),
          )
        : [],
    },
  };
};
export default getNodeResponseFormat;
