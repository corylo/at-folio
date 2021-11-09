import { IProfilePageState } from "./profilePageState";

export interface IProfilePageContext {
  state: IProfilePageState;
  setStateTo: (state: IProfilePageState) => void;
}