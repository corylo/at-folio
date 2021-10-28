import { FormValidator } from "../../../../../validators/formValidator";

import { LodashUtility } from "../../../../../utilities/lodashUtility";

import { IAddLinkFormState } from "../models/addLinkFormState";

import { FormError } from "../../../../../enums/formError";

interface IAddLinkFormValidator {
  validate: (state: IAddLinkFormState) => IAddLinkFormState;
}

export const AddLinkFormValidator: IAddLinkFormValidator = {
  validate: (state: IAddLinkFormState): IAddLinkFormState => {
    const copy: IAddLinkFormState = LodashUtility.clone(state);

    const { errors, fields } = copy;

    if(!FormValidator.isNotEmpty(fields.platform)) {
      errors.platform = FormError.MissingValue;
    } else {
      errors.platform = FormError.None;
    }

    if(!FormValidator.isNotEmpty(fields.url)) {
      errors.url = FormError.MissingValue;
    } else {
      errors.url = FormError.None;
    }

    return copy;
  }
}