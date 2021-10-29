import { IFormState } from "../models/formState";

import { FormError } from "../enums/formError";

interface IFormUtility {
  determineIfValid: (state: IFormState) => boolean;
  getErrorMessage: (error: FormError, errorMessage?: string) => string;
}

export const FormUtility: IFormUtility = {
  determineIfValid: (state: IFormState): boolean => {
    const { errors } = state;

    return Object
      .values(errors)
      .filter((value: FormError) => value !== FormError.None)
      .length === 0;
  },
  getErrorMessage: (error: FormError, errorMessage?: string): string => {
    if(errorMessage) {
      return errorMessage;
    }

    switch(error) {
      case FormError.InvalidValue:
        return "Invalid";
        
      case FormError.MissingValue:
        return "Required";
      default:
        return "";
    }
  },
}