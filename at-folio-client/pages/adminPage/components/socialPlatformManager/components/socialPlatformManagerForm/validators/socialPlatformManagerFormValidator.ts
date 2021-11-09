import { FormValidator } from "../../../../../../../validators/formValidator";

import { LodashUtility } from "../../../../../../../utilities/lodashUtility";
import { SocialPlatformManagerUtility } from "../../../utilities/socialPlatformManagerUtility";

import { ISocialPlatform } from "../../../../../../../../at-folio-models/socialPlatform";
import { ISocialPlatformManagerFormState } from "../models/socialPlatformManagerFormState";

import { FormError } from "../../../../../../../enums/formError";

interface ISocialPlatformManagerFormValidator {
  validate: (state: ISocialPlatformManagerFormState) => ISocialPlatformManagerFormState;
  validateText: (text: string) => boolean;
}

export const SocialPlatformManagerFormValidator: ISocialPlatformManagerFormValidator = {
  validate: (state: ISocialPlatformManagerFormState): ISocialPlatformManagerFormState => {
    const copy: ISocialPlatformManagerFormState = LodashUtility.clone(state);

    const { errors, fields } = copy;

    if(!FormValidator.isNotEmpty(fields.text)) {
      errors.text = FormError.MissingValue;
    } else if(!SocialPlatformManagerFormValidator.validateText(fields.text)) {
      errors.text = FormError.InvalidValue;
    } else {
      errors.text = FormError.None;
    }

    return copy;
  },
  validateText: (text: string): boolean => {
    const lines: string[] = text.split("\n"),
      platforms: ISocialPlatform[] = SocialPlatformManagerUtility.formatPlatforms(text);

    return platforms.length === lines.length;
  }
}