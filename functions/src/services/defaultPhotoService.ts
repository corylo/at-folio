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
  getAndUpdateByType: (type: DefaultPhotoType | DefaultPhotoCategory, collectionIDs: UnsplashCollectionID[], count?: number) => Promise<void>;
  updateAll: (context: EventContext) => Promise<void>;
  updateByType: (type: DefaultPhotoType | DefaultPhotoCategory, photos: IUnsplashPhoto[]) => Promise<void>;
}

export const DefaultPhotoService: IDefaultPhotoService = {
  getAndUpdateByType: async (type: DefaultPhotoType | DefaultPhotoCategory, collectionIDs: UnsplashCollectionID[], count?: number): Promise<void> => {
    try {
      const photos: IUnsplashPhoto[] = await UnsplashService.getRandom(collectionIDs, count);
      
      await DefaultPhotoService.updateByType(type, photos);
    } catch (err) {
      logger.error(err);
    }
  },
  updateAll: async (context: EventContext): Promise<void> => {    
    const types: any[] = [
      DefaultPhotoService.getAndUpdateByType(DefaultPhotoType.Background, UnsplashUtility.getCollectionIDs()),
      DefaultPhotoService.getAndUpdateByType(DefaultPhotoType.Display, UnsplashUtility.getCollectionIDs()),
      DefaultPhotoService.getAndUpdateByType(DefaultPhotoType.Profile, UnsplashUtility.getCollectionIDs())
    ];

    const categories: any[] = [      
      DefaultPhotoService.getAndUpdateByType(DefaultPhotoCategory.Abstract, [UnsplashCollectionID.Abstract]),
      DefaultPhotoService.getAndUpdateByType(DefaultPhotoCategory.City, [UnsplashCollectionID.City]),
      DefaultPhotoService.getAndUpdateByType(DefaultPhotoCategory.Nature, [UnsplashCollectionID.Nature]),
      DefaultPhotoService.getAndUpdateByType(DefaultPhotoCategory.Space, [UnsplashCollectionID.Space])
    ]
    
    await Promise.all([...types, ...categories]);
  },  
  updateByType: async (type: DefaultPhotoType | DefaultPhotoCategory, photos: IUnsplashPhoto[]): Promise<void> => {        
    await admin.collection(FirestoreCollectionID.DefaultPhotos)
      .doc(type.toLowerCase())
      .withConverter<IUnsplashPhotoGroup>(unsplashPhotoGroupConverter)
      .set({ photos, type: null });
  }
}