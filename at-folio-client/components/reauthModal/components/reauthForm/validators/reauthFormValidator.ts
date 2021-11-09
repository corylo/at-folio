import { FormValidator } from "../../../../../validators/formValidator";

import { LodashUtility } from "../../../../../utilities/lodashUtility";

import { IReauthFormState } from "../models/reauthFormState";

import { FormError } from "../../../../../enums/formError";

interface IReauthFormValidator {
  validate: (state: IReauthFormState) => IReauthFormState;
}

export const ReauthFormValidator: IReauthFormValidator = {
  validate: (state: IReauthFormState): IReauthFormState => {
    const copy: IReauthFormState = LodashUtility.clone(state);

    const { errors, fields } = copy;

    if(!FormValidator.isNotEmpty(fields.password)) {
      errors.password = FormError.MissingValue;
    } else {
      errors.password = FormError.None;
    }

    return copy;
  }
}