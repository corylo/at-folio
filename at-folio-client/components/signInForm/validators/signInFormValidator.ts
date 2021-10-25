import { FormValidator } from "../../../validators/formValidator";

import { LodashUtility } from "../../../utilities/lodashUtility";

import { ISignInFormState } from "../models/signInFormState";

import { FormError } from "../../../enums/formError";

interface ISignInFormValidator {
  validate: (state: ISignInFormState) => ISignInFormState;
}

export const SignInFormValidator: ISignInFormValidator = {
  validate: (state: ISignInFormState): ISignInFormState => {
    const copy: ISignInFormState = LodashUtility.clone(state);

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