import { DefaultPhotoCategory } from "../at-folio-enums/defaultPhotoCategory";

interface IPhotoUtility {
  getDefaultCategories: () => DefaultPhotoCategory[];
}

export const PhotoUtility: IPhotoUtility = {
  getDefaultCategories: (): DefaultPhotoCategory[] => {
    return [
      DefaultPhotoCategory.Abstract,
      DefaultPhotoCategory.City,
      DefaultPhotoCategory.Nature,
      DefaultPhotoCategory.Space
    ]
  }
}