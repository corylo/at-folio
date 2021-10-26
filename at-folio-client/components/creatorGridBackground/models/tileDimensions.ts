import { defaultSize, ISize } from "../../../models/size";

export interface ITileDimensions {
  size: ISize;
  unit: string;
}

export const defaultTileDimensions = (): ITileDimensions => ({
  size: defaultSize(),
  unit: "vw"
});