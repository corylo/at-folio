import { EventContext, logger } from "firebase-functions";

import { admin } from "../../config/firebase";

import { UnsplashService } from "./unsplashService";

import { IUnsplashPhoto } from "../../../at-folio-models/unsplashPhoto";
import { IUnsplashPhotoGroup, unsplashPhotoGroupConverter } from "../../../at-folio-models/unsplashPhotoGroup";

import { DefaultPhotoType } from "../../../at-folio-enums/defaultPhotoType";
import { FirestoreCollectionID } from "../../../at-folio-enums/firestoreCollectionID";

interface IDefaultPhotoService {  
  updateAll: (context: EventContext) => Promise<void>;
  updateByType: (type: DefaultPhotoType, photos: IUnsplashPhoto[]) => Promise<void>;
}

export const DefaultPhotoService: IDefaultPhotoService = {
  updateAll: async (context: EventContext): Promise<void> => {
    try {
      const backgrounds: IUnsplashPhoto[] = await UnsplashService.getRandom(24);

      await DefaultPhotoService.updateByType(DefaultPhotoType.Background, backgrounds);
    } catch (err) {
      logger.error(err);
    }
    
    try {      
      const displays: IUnsplashPhoto[] = await UnsplashService.getRandom(24);

      await DefaultPhotoService.updateByType(DefaultPhotoType.Display, displays);
    } catch (err) {
      logger.error(err);
    }
    
    try {      
      const profiles: IUnsplashPhoto[] = await UnsplashService.getRandom(24);

      await DefaultPhotoService.updateByType(DefaultPhotoType.Profile, profiles);
    } catch (err) {
      logger.error(err);
    }
  },  
  updateByType: async (type: DefaultPhotoType, photos: IUnsplashPhoto[]): Promise<void> => {        
    await admin.collection(FirestoreCollectionID.DefaultPhotos)
      .doc(type)
      .withConverter<IUnsplashPhotoGroup>(unsplashPhotoGroupConverter)
      .update({ photos });
  }
}