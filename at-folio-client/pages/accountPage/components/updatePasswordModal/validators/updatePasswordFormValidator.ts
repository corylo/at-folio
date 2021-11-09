import { FormValidator } from "../../../../../validators/formValidator";

import { LodashUtility } from "../../../../../utilities/lodashUtility";

import { IUpdatePasswordModalState } from "../models/updatePasswordModalState";

import { FormError } from "../../../../../enums/formError";

interface IUpdatePasswordFormValidator {
  validate: (state: IUpdatePasswordModalState) => IUpdatePasswordModalState;
}

export const UpdatePasswordFormValidator: IUpdatePasswordFormValidator = {
  validate: (state: IUpdatePasswordModalState): IUpdatePasswordModalState => {
    const copy: IUpdatePasswordModalState = LodashUtility.clone(state);

    const { errors, fields } = copy;

    if(!FormValidator.isNotEmpty(fields.password)) {
      errors.password = FormError.MissingValue;
    } else {
      errors.password = FormError.None;
    }

    if(!FormValidator.isNotEmpty(fields.confirmedPassword)) {
      errors.confirmedPassword = FormError.MissingValue;
    } else if (fields.password !== fields.confirmedPassword) {
      errors.confirmedPassword = FormError.NotMatching;
    }  else {
      errors.confirmedPassword = FormError.None;
    }
    
    return copy;
  }
}