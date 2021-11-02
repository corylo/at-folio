import { EventContext, logger } from "firebase-functions";

import { admin } from "../../config/firebase";

import { UnsplashService } from "./unsplashService";

import { UnsplashUtility } from "../../../at-folio-utilities/unsplashUtility";

import { IUnsplashPhoto } from "../../../at-folio-models/unsplashPhoto";
import { IUnsplashPhotoGroup, unsplashPhotoGroupConverter } from "../../../at-folio-models/unsplashPhotoGroup";

import { DefaultPhotoCategory } from "../../../at-folio-enums/defaultPhotoCategory";
import { DefaultPhotoType } from "../../../at-folio-enums/defaultPhotoType";
import { FirestoreCollectionID } from "../../../at-folio-enums/firestoreCollectionID";
import { UnsplashCollectionID } from "../../../at-folio-enums/unsplashCollectionID";

interface IDefaultPhotoService {  
  getAndUpdateByID: (type: DefaultPhotoType | DefaultPhotoCategory, collectionIDs: UnsplashCollectionID[], count?: number) => Promise<void>;
  updateAll: (context: EventContext) => Promise<void>;
  updateByID: (id: DefaultPhotoType | DefaultPhotoCategory, photos: IUnsplashPhoto[]) => Promise<void>;
}

export const DefaultPhotoService: IDefaultPhotoService = {
  getAndUpdateByID: async (id: DefaultPhotoType | DefaultPhotoCategory, collectionIDs: UnsplashCollectionID[], count?: number): Promise<void> => {
    try {
      const photos: IUnsplashPhoto[] = await UnsplashService.getRandom(collectionIDs, count);
      
      await DefaultPhotoService.updateByID(id, photos);
    } catch (err) {
      logger.error(err);
    }
  },
  updateAll: async (context: EventContext): Promise<void> => {    
    const types: any[] = [
      DefaultPhotoService.getAndUpdateByID(DefaultPhotoType.Background, UnsplashUtility.getCollectionIDs()),
      DefaultPhotoService.getAndUpdateByID(DefaultPhotoType.Display, UnsplashUtility.getCollectionIDs()),
      DefaultPhotoService.getAndUpdateByID(DefaultPhotoType.Profile, UnsplashUtility.getCollectionIDs())
    ];

    const categories: any[] = [      
      DefaultPhotoService.getAndUpdateByID(DefaultPhotoCategory.Abstract, [UnsplashCollectionID.Abstract]),
      DefaultPhotoService.getAndUpdateByID(DefaultPhotoCategory.City, [UnsplashCollectionID.City]),
      DefaultPhotoService.getAndUpdateByID(DefaultPhotoCategory.Nature, [UnsplashCollectionID.Nature]),
      DefaultPhotoService.getAndUpdateByID(DefaultPhotoCategory.Space, [UnsplashCollectionID.Space])
    ]
    
    await Promise.all([...types, ...categories]);
  },  
  updateByID: async (id: DefaultPhotoType | DefaultPhotoCategory, photos: IUnsplashPhoto[]): Promise<void> => {        
    await admin.collection(FirestoreCollectionID.DefaultPhotos)
      .doc(id)
      .withConverter<IUnsplashPhotoGroup>(unsplashPhotoGroupConverter)
      .set({ photos, type: null });
  }
}