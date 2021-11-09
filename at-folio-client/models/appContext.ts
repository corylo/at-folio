import { User } from "@firebase/auth";

import { IAppState, IAppToggles, IAppTogglesUpdate } from "./appState";
import { IProfileAdminUpdate } from "../../at-folio-models/profileAdmin";
import { IProfile, IProfileUpdate } from "../../at-folio-models/profile";
import { ISocialPlatform } from "../../at-folio-models/socialPlatform";

import { UserStatus } from "../enums/userStatus";

export interface IAppContext {
  appState: IAppState;
  platforms: ISocialPlatform[];
  profile: IProfile;
  toggles: IAppToggles;
  user: User;
  userStatus: UserStatus;
  setAppStateTo: (state: IAppState) => void;
  setAppTogglesTo: (toggles: IAppTogglesUpdate) => void;
  setProfileTo: (profile: IProfileUpdate) => void;
  setProfileAdminTo: (admin: IProfileAdminUpdate) => void;
}