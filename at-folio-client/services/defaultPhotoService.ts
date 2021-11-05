import { doc, getDoc, DocumentReference, DocumentSnapshot } from "@firebase/firestore";

import { db } from "../firebase";

import { IUnsplashPhoto } from "../../at-folio-models/unsplashPhoto";
import { IUnsplashPhotoGroup, unsplashPhotoGroupConverter } from "../../at-folio-models/unsplashPhotoGroup";

import { DefaultPhotoCategory } from "../../at-folio-enums/defaultPhotoCategory";
import { DefaultPhotoType } from "../../at-folio-enums/defaultPhotoType";
import { FirestoreCollectionID } from "../../at-folio-enums/firestoreCollectionID";

interface IDefaultPhotoService {
  getByType: (type: DefaultPhotoType | DefaultPhotoCategory) => Promise<IUnsplashPhoto[]>;
}

export const DefaultPhotoService: IDefaultPhotoService = {
  getByType: async (type: DefaultPhotoType | DefaultPhotoCategory): Promise<IUnsplashPhoto[]> => {
    const ref: DocumentReference<IUnsplashPhotoGroup> = doc(db, FirestoreCollectionID.DefaultPhotos, type.toLowerCase())
      .withConverter<IUnsplashPhotoGroup>(unsplashPhotoGroupConverter);

    const snap: DocumentSnapshot<IUnsplashPhotoGroup> = await getDoc(ref);
    
    if(snap.exists()) {
      const group: IUnsplashPhotoGroup = snap.data();
      
      return group.photos;
    }

    return [];
  }
}