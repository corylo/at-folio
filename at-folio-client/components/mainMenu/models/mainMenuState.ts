import { RequestStatus } from "../../../enums/requestStatus";

export interface IMainMenuState {
  status: RequestStatus;
}

export const defaultMainMenuState = (): IMainMenuState => ({  
  status: RequestStatus.Idle
});