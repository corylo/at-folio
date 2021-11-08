import { FormValidator } from "../../../../../validators/formValidator";

import { LodashUtility } from "../../../../../utilities/lodashUtility";

import { ISignUpFormState } from "../models/signUpFormState";

import { FormError } from "../../../../../enums/formError";

interface ISignUpFormValidator {
  validate: (state: ISignUpFormState) => ISignUpFormState;
}

export const SignUpFormValidator: ISignUpFormValidator = {
  validate: (state: ISignUpFormState): ISignUpFormState => {
    const copy: ISignUpFormState = LodashUtility.clone(state);

    const { errors, fields } = copy;

    if(!FormValidator.isNotEmpty(fields.email)) {
      errors.email = FormError.MissingValue;
    } else if(!FormValidator.isValidEmail(fields.email)) {
      errors.email = FormError.InvalidValue;
    } else {
      errors.email = FormError.None;
    }

    if(!FormValidator.isNotEmpty(fields.password)) {
      errors.password = FormError.MissingValue;
    } else {
      errors.password = FormError.None;
    }

    return copy;
  }
}