import { defaultProfile, IProfile } from "../../../../at-folio-models/profile";

import { RequestStatus } from "../../../enums/requestStatus";

export interface IProfilePageState {
  profile: IProfile;
  status: RequestStatus;
}

export const defaultProfilePageState = (): IProfilePageState => ({
  profile: defaultProfile(),
  status: RequestStatus.Loading
});