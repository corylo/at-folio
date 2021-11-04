import { IAdminPageState } from "./adminPageState";

export interface IAdminPageContext {
  state: IAdminPageState;
  setStateTo: (state: IAdminPageState) => void;
}