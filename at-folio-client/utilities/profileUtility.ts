import { ProfileBackgroundImage } from "../../at-folio-enums/profileBackgroundImage";

interface IProfileUtility {
  getBackgroundImageUrl: (backgroundImage: ProfileBackgroundImage) => string;
  getBackgroundImages: () => ProfileBackgroundImage[];
}

export const ProfileUtility: IProfileUtility = {
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