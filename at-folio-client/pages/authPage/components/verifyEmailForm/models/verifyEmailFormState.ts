import { RequestStatus } from "../../../../../enums/requestStatus";

export interface IVerifyEmailFormState {
  errorMessage: string;
  status: RequestStatus;
}

export const defaultVerifyEmailFormState = (): IVerifyEmailFormState => ({
  errorMessage: "",
  status: RequestStatus.Idle
});