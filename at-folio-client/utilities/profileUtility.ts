import { ProfileBackgroundImage } from "../../at-folio-enums/profileBackgroundImage";

interface IProfileUtility {
  getBackgroundImage: (backgroundImage: ProfileBackgroundImage | string) => string;
  getBackgroundImageUrl: (backgroundImage: ProfileBackgroundImage) => string;
}

export const ProfileUtility: IProfileUtility = {
  getBackgroundImage: (backgroundImage: ProfileBackgroundImage | string): string => {
    switch(backgroundImage) {
      case ProfileBackgroundImage.Mountains:
        return ProfileUtility.getBackgroundImageUrl(backgroundImage);
      default:
        return backgroundImage;
    }
  },
  getBackgroundImageUrl: (backgroundImage: ProfileBackgroundImage): string => {
    return `/img/backgrounds/${backgroundImage.toLowerCase()}.jpg`;
  }
}