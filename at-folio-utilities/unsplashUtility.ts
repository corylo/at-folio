import { IUnsplashPhoto } from "../at-folio-models/unsplashPhoto";
import { IUnsplashPhotoReference } from "../at-folio-models/unsplashPhotoReference";

interface IUnsplashUtility {
  mapPhotoReference: (photo: IUnsplashPhoto) => IUnsplashPhotoReference;
  mapPhotos: (photos: any[]) => IUnsplashPhoto[];
}

export const UnsplashUtility: IUnsplashUtility = {
  mapPhotoReference: (photo: IUnsplashPhoto): IUnsplashPhotoReference => {
    return {
      id: photo.id,
      urls: {
        full: photo.urls.full,
        regular: photo.urls.regular,
        thumb: photo.urls.thumb
      }
    }
  },
  mapPhotos: (photos: any[]): IUnsplashPhoto[] => {
    return photos.map((photo: any) => ({
      creator: {
        link: photo.user.links.html,
        name: photo.user.name
      },
      id: photo.id,
      links: photo.links,
      urls: photo.urls
    }));
  }
}