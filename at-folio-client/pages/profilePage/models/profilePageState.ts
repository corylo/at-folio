import { defaultProfile, IProfile } from "../../../../at-folio-models/profile";

import { RequestStatus } from "../../../enums/requestStatus";

export interface IProfilePageState {
  errorMessage: string;
  profile: IProfile;
  status: RequestStatus;
}

export const defaultProfilePageState = (): IProfilePageState => ({
  errorMessage: "",
  profile: defaultProfile(),
  status: RequestStatus.Loading
});