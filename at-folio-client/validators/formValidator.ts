import EmailValidator from "email-validator";

interface IFormValidator {
  isNotEmpty: (value: string) => boolean;
  isNotNullOrUndefined: (value: any) => boolean;
  isValidEmail: (email: string) => boolean;
}

export const FormValidator: IFormValidator = {
  isNotEmpty: (value: string): boolean => {
    if(FormValidator.isNotNullOrUndefined(value)) {
      return value.trim() !== "";
    }

    return false;
  },
  isNotNullOrUndefined: (value: any): boolean => {
    return value !== undefined && value !== null;
  },
  isValidEmail: (email: string): boolean => {
    if(
      FormValidator.isNotNullOrUndefined(email) && 
      FormValidator.isNotEmpty(email)
    ) {
      return EmailValidator.validate(email);
    }

    return false;
  }
}