import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  Tree,
} from 'typeorm';
import { INodeResponseFormat } from './nodeData.interfaces';

@Entity()
@Tree('materialized-path')
export default class NodeData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @TreeChildren()
  children?: NodeData[];

  @TreeParent()
  parent?: NodeData[];
}

const getResponseFormat = (item: NodeData): INodeResponseFormat => {
  return {
    [item.id]: {
      label: item.label,
      children: item.children
        ? item.children.map((itemResponse) => getResponseFormat(itemResponse))
        : [],
    },
  };
};
