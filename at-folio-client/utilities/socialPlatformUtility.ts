
import { CustomSocialPlatformValidator } from "../validators/customSocialPlatformValidator";

import { CustomSocialPlatformUtility } from "./customSocialPlatformUtility";
import { UrlUtility } from "./urlUtility";

import { ISocialPlatform } from "../../at-folio-models/socialPlatform";

import { Atfolio } from "../../at-folio-enums/atfolio";
import { CustomSocialPlatform } from "../../at-folio-enums/customSocialPlatform";

interface ISocialPlatformUtility {
  finalize: (platform: string, url: string, sld: string) => string;
  getUrlFormat: (platform: string, platforms: ISocialPlatform[]) => string;
  getPlatformImageUrl: (platform: string) => string;
}

export const SocialPlatformUtility: ISocialPlatformUtility = {
  finalize: (platform: string, url: string, sld: string): string => {
    if(CustomSocialPlatformValidator.exists(platform)) {
      return url;
    }

    return UrlUtility.finalize(url, sld);
  },
  getUrlFormat: (platform: string, platforms: ISocialPlatform[]): string => {
    if(CustomSocialPlatformValidator.exists(platform)) {
      return CustomSocialPlatformUtility.getFormat(platform as CustomSocialPlatform);
    } else {
      return platforms.find((p: ISocialPlatform) => p.name === platform).url;
    }
  },
  getPlatformImageUrl: (platform: string): string => {
    return `${Atfolio.CDN}/img/icons/${platform.replace(/\s/g , "-").toLowerCase()}.svg`;
  }
}