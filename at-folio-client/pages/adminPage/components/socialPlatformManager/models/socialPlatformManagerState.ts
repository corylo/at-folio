import { ISocialPlatform } from "../../../../../../at-folio-models/socialPlatform";

import { RequestStatus } from "../../../../../enums/requestStatus";

export interface ISocialPlatformManagerState {
  platforms: ISocialPlatform[];
  status: RequestStatus;
  text: string;
}

export const defaultSocialPlatformManagerState = (): ISocialPlatformManagerState => ({
  platforms: [],
  status: RequestStatus.Idle,
  text: ""
});