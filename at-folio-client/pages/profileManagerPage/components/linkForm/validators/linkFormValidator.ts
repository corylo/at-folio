import { CustomSocialPlatformValidator } from "../../../../../validators/customSocialPlatformValidator";
import { FormValidator } from "../../../../../validators/formValidator";
import { UrlValidator } from "../../../../../validators/urlValidator";

import { LodashUtility } from "../../../../../utilities/lodashUtility";
import { SocialPlatformUtility } from "../../../../../utilities/socialPlatformUtility";

import { ILinkFormState } from "../models/linkFormState";
import { ISocialPlatform } from "../../../../../../at-folio-models/socialPlatform";

import { CustomSocialPlatform } from "../../../../../../at-folio-enums/customSocialPlatform";
import { FormError } from "../../../../../enums/formError";

interface ILinkFormValidator {
  validate: (state: ILinkFormState, platforms: ISocialPlatform[]) => ILinkFormState;
  validateUrl: (platform: string, url: string, platforms: ISocialPlatform[]) => boolean;
}

export const LinkFormValidator: ILinkFormValidator = {
  validate: (state: ILinkFormState, platforms: ISocialPlatform[]): ILinkFormState => {
    const copy: ILinkFormState = LodashUtility.clone(state);

    const { errors, fields } = copy;

    if(!FormValidator.isNotEmpty(fields.platform)) {
      errors.platform = FormError.MissingValue;
    } else {
      errors.platform = FormError.None;
    }

    if(!FormValidator.isNotEmpty(fields.url)) {
      errors.url = FormError.MissingValue;
    } else if (!LinkFormValidator.validateUrl(fields.platform, fields.url, platforms)) {
      errors.url = FormError.InvalidValue;
    } else {
      errors.url = FormError.None;
    }

    return copy;
  },
  validateUrl: (platform: string, url: string, platforms: ISocialPlatform[]): boolean => {
    if(CustomSocialPlatformValidator.exists(platform)) {
      return CustomSocialPlatformValidator.validate(platform as CustomSocialPlatform, url);
    } else if(UrlValidator.validate(url)) {
      return UrlValidator.validateSLD(url, SocialPlatformUtility.getUrlByPlatform(platform, platforms));
    }

    return false;
  }
}