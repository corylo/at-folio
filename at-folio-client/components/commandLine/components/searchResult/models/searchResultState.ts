import { defaultProfile, IProfile } from "../../../../../../at-folio-models/profile";

import { RequestStatus } from "../../../../../enums/requestStatus";

export interface ISearchResultState {
  focused: boolean;
  profile: IProfile;
  status: RequestStatus;
}

export const defaultSearchResultState = (): ISearchResultState => ({
  focused: false,
  profile: defaultProfile(),
  status: RequestStatus.Loading
});