/** *
 * Requested tree interface requested by the client
 */
export interface ITreeResponseFormat {
  [id: number]: {
    label: string;
    children: ITreeResponseFormat[];
  };
}
