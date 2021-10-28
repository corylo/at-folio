import { IAppState, IAppTogglesUpdate } from "./appState";
import { IProfile, IProfileUpdate } from "../../at-folio-models/profile";

export interface IAppContext {
  appState: IAppState;
  profile: IProfile;
  setAppStateTo: (state: IAppState) => void;
  setAppTogglesTo: (toggles: IAppTogglesUpdate) => void;
  setProfileTo: (profile: IProfileUpdate) => void;
}