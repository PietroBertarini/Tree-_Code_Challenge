export interface IResponseNode {
  [id: number]: {
    label: string;
    children: IResponseNode[];
  };
}
