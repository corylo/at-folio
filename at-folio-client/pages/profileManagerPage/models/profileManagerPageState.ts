import { RequestStatus } from "../../../enums/requestStatus";

export interface IProfileManagerPageState {
  status: RequestStatus;
  tutorialToggled: boolean;
}

export const defaultProfileManagerPageState = (): IProfileManagerPageState => ({
  status: RequestStatus.Idle,
  tutorialToggled: false
});