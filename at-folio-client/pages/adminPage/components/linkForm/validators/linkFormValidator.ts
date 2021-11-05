import { FormValidator } from "../../../../../validators/formValidator";
import { UrlValidator } from "../../../../../validators/urlValidator";

import { LodashUtility } from "../../../../../utilities/lodashUtility";
import { SocialPlatformUtility } from "../../../../../utilities/socialPlatformUtility";

import { ILinkFormState } from "../models/linkFormState";

import { FormError } from "../../../../../enums/formError";
import { SocialPlatform } from "../../../../../../at-folio-enums/socialPlatform";

interface ILinkFormValidator {
  validate: (state: ILinkFormState) => ILinkFormState;
  validateUrl: (platform: SocialPlatform, url: string) => boolean;
}

export const LinkFormValidator: ILinkFormValidator = {
  validate: (state: ILinkFormState): ILinkFormState => {
    const copy: ILinkFormState = LodashUtility.clone(state);

    const { errors, fields } = copy;

    if(!FormValidator.isNotEmpty(fields.platform)) {
      errors.platform = FormError.MissingValue;
    } else {
      errors.platform = FormError.None;
    }

    if(!FormValidator.isNotEmpty(fields.url)) {
      errors.url = FormError.MissingValue;
    } else if (!LinkFormValidator.validateUrl(fields.platform, fields.url)) {
      errors.url = FormError.InvalidValue;
    } else {
      errors.url = FormError.None;
    }

    return copy;
  },
  validateUrl: (platform: SocialPlatform, url: string): boolean => {
    if(UrlValidator.validate(url)) {
      return UrlValidator.validateSLD(url, SocialPlatformUtility.getSLDByPlatform(platform));
    }

    return false;
  }
}