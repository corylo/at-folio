import { FormValidator } from "../../../../../validators/formValidator";

import { LodashUtility } from "../../../../../utilities/lodashUtility";

import { IDeleteAccountModalState } from "../models/deleteAccountModalState";

import { FormError } from "../../../../../enums/formError";

interface IDeleteAccountFormValidator {
  validate: (state: IDeleteAccountModalState) => IDeleteAccountModalState;
}

export const DeleteAccountFormValidator: IDeleteAccountFormValidator = {
  validate: (state: IDeleteAccountModalState): IDeleteAccountModalState => {
    const copy: IDeleteAccountModalState = LodashUtility.clone(state);

    const { errors, fields } = copy;

    if(!FormValidator.isNotEmpty(fields.confirmText)) {
      errors.confirmText = FormError.MissingValue;
    } else if(fields.confirmText !== "DELETE") {
      errors.confirmText = FormError.InvalidValue;
    } else {
      errors.confirmText = FormError.None;
    }
    
    return copy;
  }
}