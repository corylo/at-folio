import { FormValidator } from "../../../../../validators/formValidator";

import { LodashUtility } from "../../../../../utilities/lodashUtility";

import { IResetPasswordFormState } from "../models/resetPasswordFormState";

import { FormError } from "../../../../../enums/formError";

interface IResetPasswordFormValidator {
  validate: (state: IResetPasswordFormState) => IResetPasswordFormState;
}

export const ResetPasswordFormValidator: IResetPasswordFormValidator = {
  validate: (state: IResetPasswordFormState): IResetPasswordFormState => {
    const copy: IResetPasswordFormState = LodashUtility.clone(state);

    const { errors, fields } = copy;

    if(!FormValidator.isNotEmpty(fields.email)) {
      errors.email = FormError.MissingValue;
    } else if(!FormValidator.isValidEmail(fields.email)) {
      errors.email = FormError.InvalidValue;
    } else {
      errors.email = FormError.None;
    }

    return copy;
  }
}