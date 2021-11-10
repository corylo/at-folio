import { CustomSocialPlatform } from "../../at-folio-enums/customSocialPlatform"

interface ICustomSocialPlatformUtility {  
  getFormat: (platform: CustomSocialPlatform) => string;
  list: () => CustomSocialPlatform[];
}

export const CustomSocialPlatformUtility: ICustomSocialPlatformUtility = {
  getFormat: (platform: CustomSocialPlatform): string => {
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