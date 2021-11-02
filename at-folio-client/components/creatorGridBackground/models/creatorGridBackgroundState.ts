import { defaultPosition, IPosition } from "../../../models/position";
import { defaultSize, ISize } from "../../../models/size";
import { ITileDimensions } from "./tileDimensions";
import { IUnsplashPhoto } from "../../../../at-folio-models/unsplashPhoto";

import { RequestStatus } from "../../../enums/requestStatus";

export interface ICreatorGridBackgroundState {
  columns: number;
  dimensions: ITileDimensions;
  interval: number;
  photos: IUnsplashPhoto[];
  position: IPosition;  
  status: RequestStatus;
  window: ISize;
}

export const defaultCreatorGridBackgroundState = (dimensions: ITileDimensions, interval: number): ICreatorGridBackgroundState => ({
  columns: 3,
  dimensions,
  interval,  
  photos: [],
  position: defaultPosition(),
  status: RequestStatus.Loading,
  window: defaultSize()
})