export interface INodeResponseFormat {
  [id: number]: {
    label: string;
    children: INodeResponseFormat[];
  };
}
