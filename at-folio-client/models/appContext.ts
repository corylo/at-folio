import { IAppState } from "./appState";

export interface IAppContext {
  appState: IAppState;
  setAppState: (state: IAppState) => void;
}