import { defaultPosition, IPosition } from "../../../../../models/position";
import { defaultSize, ISize } from "../../../../../models/size";

export interface IProfileTutorialState {
  position: IPosition;
  step: number;
  steps: number;
  window: ISize;
}

export const defaultProfileTutorialState = (): IProfileTutorialState => ({
  position: defaultPosition(),
  step: 1,
  steps: 2,
  window: defaultSize()
});