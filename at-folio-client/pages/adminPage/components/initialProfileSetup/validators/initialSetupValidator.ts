import { FormValidator } from "../../../../../validators/formValidator";

import { LodashUtility } from "../../../../../utilities/lodashUtility";

import { IInitialSetupState } from "../models/initialSetupState";

import { FormError } from "../../../../../enums/formError";

interface IInitialSetupValidator {
  validate: (state: IInitialSetupState) => IInitialSetupState;
}

export const InitialSetupValidator: IInitialSetupValidator = {
  validate: (state: IInitialSetupState): IInitialSetupState => {
    const copy: IInitialSetupState = LodashUtility.clone(state);

    const { errors, fields } = copy;

    if(!FormValidator.isNotEmpty(fields.username)) {
      errors.username = FormError.MissingValue;
    } else if(fields.username.length < 3) {
      errors.username = FormError.TooShort;
    } else {
      errors.username = FormError.None;
    }
    
    return copy;
  }
}