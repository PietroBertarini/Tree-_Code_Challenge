export interface ITreeResponseFormat {
  [id: number]: {
    label: string;
    children: ITreeResponseFormat[];
  };
}
