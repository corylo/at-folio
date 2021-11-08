import { IAccountPageState } from "./accountPageState";

import { AccountAction } from "../enums/accountAction";

export interface IAccountPageContext {
  state: IAccountPageState;
  setStateTo: (state: IAccountPageState) => void;
  setActionTo: (action: AccountAction) => void;
}