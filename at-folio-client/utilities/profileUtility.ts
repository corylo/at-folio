import { ProfileBackgroundImage } from "../../at-folio-enums/profileBackgroundImage";

interface IProfileUtility {
  getBackgroundImage: (backgroundImage: ProfileBackgroundImage) => string;
  getBackgroundImageUrl: (backgroundImage: ProfileBackgroundImage) => string;
  getBackgroundImages: () => ProfileBackgroundImage[];
}

export const ProfileUtility: IProfileUtility = {
  getBackgroundImage: (backgroundImage: ProfileBackgroundImage): string => {
    return ProfileUtility.getBackgroundImageUrl(backgroundImage);
  },
  getBackgroundImageUrl: (backgroundImage: ProfileBackgroundImage): string => {
    return `/img/backgrounds/${backgroundImage.toLowerCase()}.jpg`;
  },
  getBackgroundImages: (): ProfileBackgroundImage[] => {
    return [
      ProfileBackgroundImage.Beach,
      ProfileBackgroundImage.City,
      ProfileBackgroundImage.Coffee,
      ProfileBackgroundImage.Flowers,
      ProfileBackgroundImage.Mountains,
      ProfileBackgroundImage.Parrots
    ]
  }
}