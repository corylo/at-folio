import { AccountAction } from "../enums/accountAction";
import { RequestStatus } from "../../../enums/requestStatus";

export interface IAccountPageState {
  action: AccountAction;
  status: RequestStatus;
}

export const defaultAccountPageState = (): IAccountPageState => ({
  action: AccountAction.None,
  status: RequestStatus.Idle
});