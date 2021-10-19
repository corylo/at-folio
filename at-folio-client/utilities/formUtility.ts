import { IFormState } from "../models/formState";

import { FormError } from "../enums/formError";

interface IFormUtility {
  determineIfValid: (state: IFormState) => boolean;
  getErrorMessage: (error: FormError) => string;
}

export const FormUtility: IFormUtility = {
  determineIfValid: (state: IFormState): boolean => {
    const { errors } = state;

    return Object
      .values(errors)
      .filter((value: FormError) => value !== FormError.None)
      .length === 0;
  },
  getErrorMessage: (error: FormError): string => {
    switch(error) {
      case FormError.InvalidValue:
        return "Invalid";
        
      case FormError.MissingValue:
        return "Required";
      default:
        return "";
    }
  }
}