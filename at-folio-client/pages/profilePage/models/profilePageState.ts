import { defaultProfile, IProfile } from "../../../../at-folio-models/profile";

import { RequestStatus } from "../../../../at-folio-enums/requestStatus";

export interface IProfilePageState {
  profile: IProfile;
  status: RequestStatus;
}

export const defaultProfilePageState = (): IProfilePageState => ({
  profile: defaultProfile(),
  status: RequestStatus.Loading
});