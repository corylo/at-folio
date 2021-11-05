import { User } from "@firebase/auth";

import { defaultProfile, IProfile } from "../../at-folio-models/profile";
import { ISocialPlatform } from "../../at-folio-models/socialPlatform";

import { UserStatus } from "../enums/userStatus";

export interface IAppToggles {
  mainMenu: boolean;
}

export interface IAppTogglesUpdate {
  mainMenu?: boolean;
}

export const defaultAppToggles = (): IAppToggles => ({
  mainMenu: false
});

export interface IAppState {
  platforms: ISocialPlatform[];
  profile: IProfile
  toggles: IAppToggles;
  user: User;
  userStatus: UserStatus;
}

export const defaultAppState = (): IAppState => ({
  platforms: [],
  profile: defaultProfile(),
  toggles: defaultAppToggles(),
  user: null,
  userStatus: UserStatus.Loading
})