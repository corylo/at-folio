import { Unsplash } from "../../config/unsplash";

import { UnsplashUtility } from "../../../at-folio-utilities/unsplashUtility";

import { IUnsplashPhoto } from "../../../at-folio-models/unsplashPhoto";

import { UnsplashCollectionID } from "../../../at-folio-enums/unsplashCollectionID";

interface IUnsplashService {
  getRandom: (collectionIds: UnsplashCollectionID[], count?: number) => Promise<IUnsplashPhoto[]>;
}

export const UnsplashService: IUnsplashService = {
  getRandom: async (collectionIds: UnsplashCollectionID[], count?: number): Promise<IUnsplashPhoto[]> => {    
    const res: any = await Unsplash.photos.getRandom({ 
      count: count || 24, 
      contentFilter: "high",
      orientation: "landscape",
      collectionIds
    });

    return UnsplashUtility.mapPhotos(res.response);
  }
}