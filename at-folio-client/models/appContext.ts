import { IAppState, IAppTogglesUpdate } from "./appState";
import { IProfileAdminUpdate } from "../../at-folio-models/profileAdmin";
import { IProfile, IProfileUpdate } from "../../at-folio-models/profile";

import { UserStatus } from "../enums/userStatus";

export interface IAppContext {
  appState: IAppState;
  profile: IProfile;
  userStatus: UserStatus;
  setAppStateTo: (state: IAppState) => void;
  setAppTogglesTo: (toggles: IAppTogglesUpdate) => void;
  setProfileTo: (profile: IProfileUpdate) => void;
  setProfileAdminTo: (admin: IProfileAdminUpdate) => void;
}