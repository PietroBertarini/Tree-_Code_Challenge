import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  Tree as TreeEntity,
} from 'typeorm';

@Entity()
@TreeEntity('materialized-path')
export default class Tree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @TreeChildren()
  children?: Tree[];

  @TreeParent()
  parent?: Tree;
}
