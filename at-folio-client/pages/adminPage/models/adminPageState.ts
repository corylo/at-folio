import { RequestStatus } from "../../../enums/requestStatus";

export interface IAdminPageState {
  status: RequestStatus;
}

export const defaultAdminPageState = (): IAdminPageState => ({
  status: RequestStatus.Loading
});