import { ProfileBackgroundImage } from "../../at-folio-enums/profileBackgroundImage";

interface IProfileUtility {
  getBackgroundImage: (backgroundImage: ProfileBackgroundImage | string) => string;
  getBackgroundImageUrl: (backgroundImage: ProfileBackgroundImage) => string;
  getBackgroundImages: () => ProfileBackgroundImage[];
}

export const ProfileUtility: IProfileUtility = {
  getBackgroundImage: (backgroundImage: ProfileBackgroundImage | string): string => {
    switch(backgroundImage) {
      case ProfileBackgroundImage.Beach:
      case ProfileBackgroundImage.City:
      case ProfileBackgroundImage.Flowers:
      case ProfileBackgroundImage.Mountains:
        return ProfileUtility.getBackgroundImageUrl(backgroundImage);
      default:
        return backgroundImage;
    }
  },
  getBackgroundImageUrl: (backgroundImage: ProfileBackgroundImage): string => {
    return `/img/backgrounds/${backgroundImage.toLowerCase()}.jpg`;
  },
  getBackgroundImages: (): ProfileBackgroundImage[] => {
    return [
      ProfileBackgroundImage.Beach,
      ProfileBackgroundImage.City,
      ProfileBackgroundImage.Flowers,
      ProfileBackgroundImage.Mountains
    ]
  }
}