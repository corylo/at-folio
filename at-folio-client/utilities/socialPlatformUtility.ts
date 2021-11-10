
import { CustomSocialPlatformValidator } from "../validators/customSocialPlatformValidator";

import { UrlUtility } from "./urlUtility";

import { ISocialPlatform } from "../../at-folio-models/socialPlatform";

import { Atfolio } from "../../at-folio-enums/atfolio";

interface ISocialPlatformUtility {
  finalize: (platform: string, url: string, sld: string) => string;
  getPlatformImageUrl: (platform: string) => string;
  getUrlByPlatform: (platform: string, platforms: ISocialPlatform[]) => string;
}

export const SocialPlatformUtility: ISocialPlatformUtility = {
  finalize: (platform: string, url: string, sld: string): string => {
    if(CustomSocialPlatformValidator.exists(platform)) {
      return url;
    }

    return UrlUtility.finalize(url, sld);
  },
  getPlatformImageUrl: (platform: string): string => {
    return `${Atfolio.CDN}/img/icons/${platform.replace(/\s/g , "-").toLowerCase()}.svg`;
  },
  getUrlByPlatform: (platform: string, platforms: ISocialPlatform[]): string => {
    return platforms.find((p: ISocialPlatform) => p.name === platform).url;
  }
}