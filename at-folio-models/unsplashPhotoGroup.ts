import { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";

import { IUnsplashPhoto } from "./unsplashPhoto";

import { DefaultPhotoCategory } from "../at-folio-enums/defaultPhotoCategory";
import { DefaultPhotoType } from "../at-folio-enums/defaultPhotoType";

export interface IUnsplashPhotoGroup {
  photos: IUnsplashPhoto[];
  type: DefaultPhotoType | DefaultPhotoCategory;
}

export const unsplashPhotoGroupConverter: any = {
  toFirestore(group: IUnsplashPhotoGroup): DocumentData {
    return {
      photos: group.photos
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<IUnsplashPhotoGroup>): IUnsplashPhotoGroup {
    const data: IUnsplashPhotoGroup = snapshot.data();

    return {
      photos: data.photos,
      type: snapshot.id as DefaultPhotoType | DefaultPhotoCategory
    }
  }
}