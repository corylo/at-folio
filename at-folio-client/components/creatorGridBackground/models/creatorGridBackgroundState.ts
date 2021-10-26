import { defaultPosition, IPosition } from "../../../models/position";
import { defaultSize, ISize } from "../../../models/size";
import { ITileDimensions } from "./tileDimensions";

export interface ICreatorGridBackgroundState {
  columns: number;
  dimensions: ITileDimensions;
  interval: number;
  position: IPosition;
  window: ISize;
}

export const defaultCreatorGridBackgroundState = (dimensions: ITileDimensions, interval: number): ICreatorGridBackgroundState => ({
  columns: 3,
  dimensions,
  interval,  
  position: defaultPosition(),
  window: defaultSize()
})