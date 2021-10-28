import { ProfileImageOption } from "../../at-folio-enums/profileImageOption";

interface IProfileUtility {
  getImageUrl: (backgroundImage: ProfileImageOption) => string;
  getImages: () => ProfileImageOption[];
  getGridImages: () => ProfileImageOption[];
}

export const ProfileUtility: IProfileUtility = {
  getImageUrl: (backgroundImage: ProfileImageOption): string => {
    if(backgroundImage) {
      return `/img/backgrounds/${backgroundImage.toLowerCase()}.webp`;
    }

    return ProfileImageOption.None;
  },
  getImages: (): ProfileImageOption[] => {
    return [
      ProfileImageOption.Beach,
      ProfileImageOption.City,
      ProfileImageOption.Coffee,
      ProfileImageOption.Flowers,
      ProfileImageOption.Mountains,
      ProfileImageOption.Parrots
    ]
  },
  getGridImages: (): ProfileImageOption[] => {
    return [
      ProfileImageOption.Beach,
      ProfileImageOption.City,
      ProfileImageOption.Coffee,
      ProfileImageOption.Flowers,
      ProfileImageOption.Mountains,
      ProfileImageOption.Parrots
    ]
  }
}