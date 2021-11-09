import { ISocialPlatformManagerState } from "./socialPlatformManagerState";

export interface ISocialPlatformManagerContext {
  state: ISocialPlatformManagerState;
  setStateTo: (state: ISocialPlatformManagerState) => void;
}