import { ProfileUtility } from "../utilities/profileUtility";

import { IProfile } from "../../at-folio-models/profile";

import { ProfileBackgroundImage } from "../../at-folio-enums/profileBackgroundImage";
import { SocialPlatform } from "../../at-folio-enums/socialPlatform";

interface IProfileService {
  getByUsername: (username: string) => Promise<IProfile>;
}

export const ProfileService: IProfileService = {
  getByUsername: async (username: string): Promise<IProfile> => {
    return {
      backgroundImage: ProfileUtility.getBackgroundImage(ProfileBackgroundImage.Parrots),
      username,
      links: [{
        platform: SocialPlatform.Facebook,
        url: "https://facebook.com"
      }, {
        platform: SocialPlatform.TikTok,
        url: "https://tiktok.com"
      }, {
        platform: SocialPlatform.Reddit,
        url: "https://reddit.com"
      }, {
        platform: SocialPlatform.YouTube,
        url: "https://youtube.com"
      }, {
        platform: SocialPlatform.Twitch,
        url: "https://twitch.tv"
      }],
      profileImage: "/img/profile.png"
    }
  }
}