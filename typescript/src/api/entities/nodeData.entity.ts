import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  Tree,
} from 'typeorm';
import { IResponseNode } from './nodeData.interfaces';

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
