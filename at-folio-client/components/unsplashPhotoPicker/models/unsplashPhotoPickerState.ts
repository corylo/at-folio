import { IUnsplashPhoto } from "../../../../at-folio-models/unsplashPhoto";

import { DefaultPhotoCategory } from "../../../../at-folio-enums/defaultPhotoCategory";
import { DefaultPhotoType } from "../../../../at-folio-enums/defaultPhotoType";
import { RequestStatus } from "../../../enums/requestStatus";

export interface IUnsplashPhotoPickerState {
  photos: IUnsplashPhoto[];
  selectedType: DefaultPhotoType | DefaultPhotoCategory;
  status: RequestStatus;
}

export const defaultUnsplashPhotoPickerState = (selectedType: DefaultPhotoType | DefaultPhotoCategory): IUnsplashPhotoPickerState => ({
  photos: [],
  selectedType,
  status: RequestStatus.Loading
});