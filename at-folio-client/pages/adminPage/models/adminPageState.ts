import { RequestStatus } from "../../../enums/requestStatus";

export interface IAdminPageState {
  status: RequestStatus;
  tutorialToggled: boolean;
}

export const defaultAdminPageState = (): IAdminPageState => ({
  status: RequestStatus.Idle,
  tutorialToggled: false
});