import { CustomSocialPlatform } from "../../at-folio-enums/customSocialPlatform"

interface ICustomSocialPlatformUtility {  
  getFormatByPlatform: (platform: CustomSocialPlatform) => string;
  list: () => CustomSocialPlatform[];
}

export const CustomSocialPlatformUtility: ICustomSocialPlatformUtility = {
  getFormatByPlatform: (platform: CustomSocialPlatform): string => {
    switch(platform) {
      case CustomSocialPlatform.Email:
        return "my@email.com";
      default:
        throw new Error(`Unknown custom social platform: ${platform}`);
    }
  },
  list: (): CustomSocialPlatform[] => {
    return [
      CustomSocialPlatform.Email
    ]
  }
}