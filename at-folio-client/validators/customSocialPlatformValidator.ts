import { CustomSocialPlatformUtility } from "../utilities/customSocialPlatformUtility";

import { CustomSocialPlatform } from "../../at-folio-enums/customSocialPlatform";
import { FormValidator } from "./formValidator";

interface ICustomSocialPlatformValidator {
  exists: (platform: string) => boolean;
  validate: (platform: CustomSocialPlatform, url: string) => boolean;
}

export const CustomSocialPlatformValidator: ICustomSocialPlatformValidator = {
  exists: (platform: string): boolean => {
    return CustomSocialPlatformUtility.list().includes(platform as CustomSocialPlatform);
  },
  validate: (platform: CustomSocialPlatform, url: string): boolean => {
    if(platform === CustomSocialPlatform.Email) {
      return FormValidator.isValidEmail(url);
    }

    return false;
  }
}