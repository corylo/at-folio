import { IUnsplashPhoto } from "../../../../at-folio-models/unsplashPhoto";

import { RequestStatus } from "../../../enums/requestStatus";

export interface IUnsplashPhotoPickerState {
  photos: IUnsplashPhoto[];
  status: RequestStatus;
}

export const defaultUnsplashPhotoPickerState = (): IUnsplashPhotoPickerState => ({
  photos: [],
  status: RequestStatus.Loading
});