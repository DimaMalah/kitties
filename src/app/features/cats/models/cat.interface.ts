export interface IBreed {
  name: string;
  description: string;
  [key: string]: string | number;
}

export interface ICat {
  breeds: IBreed[];
  height: number;
  id: string;
  url: string;
  width: number;
}
