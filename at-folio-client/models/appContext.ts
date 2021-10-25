import { IAppState, IAppTogglesUpdate } from "./appState";

export interface IAppContext {
  appState: IAppState;
  setAppState: (state: IAppState) => void;
  setAppToggles: (toggles: IAppTogglesUpdate) => void;
}