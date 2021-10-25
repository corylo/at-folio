import { RequestStatus } from "../../../enums/requestStatus";

export interface ICommandLineState {
  query: string;
  status: RequestStatus;
}

export const defaultCommandLineState = (): ICommandLineState => ({
  query: "",
  status: RequestStatus.Idle
});