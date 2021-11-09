import { IProfileManagerPageState } from "./profileManagerPageState";

export interface IProfileManagerPageContext {
  state: IProfileManagerPageState;
  setStateTo: (state: IProfileManagerPageState) => void;
}