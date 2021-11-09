import { FormValidator } from "../../../../../validators/formValidator";

import { LodashUtility } from "../../../../../utilities/lodashUtility";

import { IUpdateEmailModalState } from "../models/updateEmailModalState";

import { FormError } from "../../../../../enums/formError";

interface IUpdateEmailFormValidator {
  validate: (state: IUpdateEmailModalState) => IUpdateEmailModalState;
}

export const UpdateEmailFormValidator: IUpdateEmailFormValidator = {
  validate: (state: IUpdateEmailModalState): IUpdateEmailModalState => {
    const copy: IUpdateEmailModalState = LodashUtility.clone(state);

    const { errors, fields } = copy;

    if(!FormValidator.isNotEmpty(fields.email)) {
      errors.email = FormError.MissingValue;
    } else if(!FormValidator.isValidEmail(fields.email)) {
      errors.email = FormError.InvalidValue;
    } else {
      errors.email = FormError.None;
    }
    
    if(!FormValidator.isNotEmpty(fields.confirmedEmail)) {
      errors.confirmedEmail = FormError.MissingValue;
    } else if (fields.email !== fields.confirmedEmail) {
      errors.confirmedEmail = FormError.NotMatching;
    }  else {
      errors.confirmedEmail = FormError.None;
    }
    
    return copy;
  }
}