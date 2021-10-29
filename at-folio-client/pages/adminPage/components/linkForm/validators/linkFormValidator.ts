import { FormValidator } from "../../../../../validators/formValidator";
import { UrlValidator } from "../../../../../validators/urlValidator";

import { LodashUtility } from "../../../../../utilities/lodashUtility";

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
      switch(platform) {
        case SocialPlatform.Discord:
          return UrlValidator.validateSLD("discord.com", url);

        case SocialPlatform.Facebook:
          return UrlValidator.validateSLD("facebook.com", url);

        case SocialPlatform.GitHub:
          return UrlValidator.validateSLD("github.com", url);

        case SocialPlatform.Instagram:
          return UrlValidator.validateSLD("instagram.com", url);

        case SocialPlatform.Reddit:
          return UrlValidator.validateSLD("reddit.com", url);

        case SocialPlatform.TikTok:
          return UrlValidator.validateSLD("tiktok.com", url);

        case SocialPlatform.Twitch:
          return UrlValidator.validateSLD("twitch.tv", url);

        case SocialPlatform.Twitter:
          return UrlValidator.validateSLD("twitter.com", url);

        case SocialPlatform.YouTube:
          return UrlValidator.validateSLD("youtube.com", url);
        default:
          throw new Error(`Unknown platform: ${platform}`);
      }
    }

    return false;
  }
}