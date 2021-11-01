import { Unsplash } from "../../config/unsplash";

import { UnsplashUtility } from "../../../at-folio-utilities/unsplashUtility";

import { IUnsplashPhoto } from "../../../at-folio-models/unsplashPhoto";

interface IUnsplashService {
  getRandom: (count?: number) => Promise<IUnsplashPhoto[]>;
}

export const UnsplashService: IUnsplashService = {
  getRandom: async (count?: number): Promise<IUnsplashPhoto[]> => {    
    const res: any = await Unsplash.photos.getRandom({ 
      count: count || 4, 
      contentFilter: "high",
      orientation: "landscape",
      collectionIds: [
        "327760", // Nature
        "q5tDUKB0fxk", // Space
        "4285541", // Abstract
        "461370" // City
      ]
    });

    return UnsplashUtility.mapPhotos(res.response);
  }
}