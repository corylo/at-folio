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
      topicIds: ["nature"]
    });

    return UnsplashUtility.mapPhotos(res.response);
  }
}