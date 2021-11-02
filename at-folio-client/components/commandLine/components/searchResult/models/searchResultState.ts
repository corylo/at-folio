import { defaultProfile, IProfile } from "../../../../../../at-folio-models/profile";

import { RequestStatus } from "../../../../../enums/requestStatus";

export interface ISearchResultState {
  profile: IProfile;
  status: RequestStatus;
}

export const defaultSearchResultState = (): ISearchResultState => ({
  profile: defaultProfile(),
  status: RequestStatus.Loading
});