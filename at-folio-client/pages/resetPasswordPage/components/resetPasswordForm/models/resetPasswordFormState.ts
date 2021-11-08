import { IFormState } from "../../../../../models/formState";

import { FormError } from "../../../../../enums/formError";
import { RequestStatus } from "../../../../../enums/requestStatus";

export interface IResetPasswordFormState extends IFormState {
  errors: {
    email: FormError;
  };
  fields: {
    email: string;
  };
}

export const defaultResetPasswordFormState = (): IResetPasswordFormState => ({
  errorMessage: "",
  errors: {
    email: FormError.None
  },
  fields: {
    email: ""
  },
  status: RequestStatus.Idle
});