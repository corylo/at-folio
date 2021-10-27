import { IAppState, IAppTogglesUpdate } from "./appState";
import { IProfileUpdate } from "../../at-folio-models/profile";

export interface IAppContext {
  appState: IAppState;
  setAppStateTo: (state: IAppState) => void;
  setAppTogglesTo: (toggles: IAppTogglesUpdate) => void;
  setProfileTo: (profile: IProfileUpdate) => void;
}