import { doc, getDoc, DocumentReference, DocumentSnapshot } from "@firebase/firestore";

import { db } from "../firebase";

import { IUnsplashPhoto } from "../../at-folio-models/unsplashPhoto";
import { IUnsplashPhotoGroup, unsplashPhotoGroupConverter } from "../../at-folio-models/unsplashPhotoGroup";

import { DefaultPhotoType } from "../../at-folio-enums/defaultPhotoType";
import { FirestoreCollectionID } from "../../at-folio-enums/firestoreCollectionID";

interface IDefaultPhotoService {
  getByType: (type: DefaultPhotoType) => Promise<IUnsplashPhoto[]>;
}

export const DefaultPhotoService: IDefaultPhotoService = {
  getByType: async (type: DefaultPhotoType): Promise<IUnsplashPhoto[]> => {
    const ref: DocumentReference<IUnsplashPhotoGroup> = doc(db, FirestoreCollectionID.DefaultPhotos, type)
      .withConverter<IUnsplashPhotoGroup>(unsplashPhotoGroupConverter);

    const snap: DocumentSnapshot<IUnsplashPhotoGroup> = await getDoc(ref);
    
    if(snap.exists()) {
      const group: IUnsplashPhotoGroup = snap.data();
      
      return group.photos;
    }

    return [];
  }
}