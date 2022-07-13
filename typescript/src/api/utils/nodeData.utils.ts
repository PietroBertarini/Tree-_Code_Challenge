import NodeData from '../entities/nodeData.entity';
import { IResponseNode } from '../entities/nodeData.interfaces';

const getResponseFormat = (item: NodeData): IResponseNode => {
  return {
    [item.id]: {
      label: item.label,
      children: item.children
        ? item.children.map((itemResponse) => getResponseFormat(itemResponse))
        : [],
    },
  };
};
export default getResponseFormat;
