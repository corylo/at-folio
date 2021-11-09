import _orderby from "lodash.orderby";

import { UrlValidator } from "../../../../../validators/urlValidator";

import { ISocialPlatform } from "../../../../../../at-folio-models/socialPlatform";

interface ISocialPlatformManagerUtility {
  formatPlatforms: (text: string) => ISocialPlatform[];
  formatText: (platforms: ISocialPlatform[]) => string;
}

export const SocialPlatformManagerUtility: ISocialPlatformManagerUtility = {
  formatPlatforms: (text: string): ISocialPlatform[] => {
    if(text.length > 0) {
      const lines: string[] = text.split("\n");

      if(lines.length >= 2) {
        let platforms: ISocialPlatform[] = [];

        for(let line of lines) {
          const split: string[] = line.split(",");

          if(split.length === 2) {
            const platform: ISocialPlatform = {
              name: split[0],
              url: split[1]
            }

            if(platform.name.trim() !== "" && UrlValidator.validate(platform.url)) {              
              platforms.push(platform);
            }
          }
        };

        return _orderby(platforms, "name");
      }
    }

    return [];
  },
  formatText: (platforms: ISocialPlatform[]): string => {
    return platforms.reduce((value: string, next: ISocialPlatform, index: number) => {
      if(index === platforms.length - 1) {
        return `${value}${next.name},${next.url}`;
      }
      
      return `${value}${next.name},${next.url}\n`;
    }, "");
  }
}