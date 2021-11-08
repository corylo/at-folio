import { FirebaseAuthMode } from "../../../enums/firebaseAuthMode";
import { RequestStatus } from "../../../enums/requestStatus";

export interface IAuthPageState {
  mode: FirebaseAuthMode;
  status: RequestStatus;
}

export const defaultAuthPageState = (): IAuthPageState => ({
  mode: FirebaseAuthMode.Undetermined,
  status: RequestStatus.Loading
});