import { FormValidator } from "../../../../../validators/formValidator";

import { LodashUtility } from "../../../../../utilities/lodashUtility";

import { IConfirmPasswordResetFormState } from "../models/confirmPasswordResetFormState";

import { FormError } from "../../../../../enums/formError";

interface IConfirmPasswordResetFormValidator {
  validate: (state: IConfirmPasswordResetFormState) => IConfirmPasswordResetFormState;
}

export const ConfirmPasswordResetFormValidator: IConfirmPasswordResetFormValidator = {
  validate: (state: IConfirmPasswordResetFormState): IConfirmPasswordResetFormState => {
    const copy: IConfirmPasswordResetFormState = LodashUtility.clone(state);

    const { errors, fields } = copy;

    if(!FormValidator.isNotEmpty(fields.password)) {
      errors.password = FormError.MissingValue;
    } else {
      errors.password = FormError.None;
    }

    return copy;
  }
}