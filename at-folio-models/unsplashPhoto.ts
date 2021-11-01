export interface IUnsplashCreator {
  name: string;
  link: string;
}

export interface IUnsplashPhotoLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface IUnsplashPhotoUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface IUnsplashPhoto {
  creator: IUnsplashCreator;
  id: string;
  links: IUnsplashPhotoLinks;
  urls: IUnsplashPhotoUrls;
}