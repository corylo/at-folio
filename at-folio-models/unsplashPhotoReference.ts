export interface IUnsplashPhotoReferenceUrls {
  full: string;
  regular: string;
  thumb: string;
}

export const defaultUnsplashPhotoReferenceUrls = (): IUnsplashPhotoReferenceUrls => ({
  full: "",
  regular: "",
  thumb: ""
});

export interface IUnsplashPhotoReference {
  id: string;
  urls: IUnsplashPhotoReferenceUrls;
}

export const defaultUnsplashPhotoReference = (): IUnsplashPhotoReference => ({
  id: "",
  urls: defaultUnsplashPhotoReferenceUrls()
});