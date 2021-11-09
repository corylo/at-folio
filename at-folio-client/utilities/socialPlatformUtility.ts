import { ISocialPlatform } from "../../at-folio-models/socialPlatform";

import { Atfolio } from "../../at-folio-enums/atfolio";

interface ISocialPlatformUtility {
  getPlatformImageUrl: (platform: string) => string;
  getUrlByPlatform: (platform: string, platforms: ISocialPlatform[]) => string;
}

export const SocialPlatformUtility: ISocialPlatformUtility = {
  getPlatformImageUrl: (platform: string): string => {
    return `${Atfolio.CDN}/img/icons/${platform.replace(/\s/g , "-").toLowerCase()}.svg`;
  },
  getUrlByPlatform: (platform: string, platforms: ISocialPlatform[]): string => {
    return platforms.find((p: ISocialPlatform) => p.name === platform).url;
  }
}