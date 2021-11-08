import { IFormState } from "../../../../../models/formState";

import { FormError } from "../../../../../enums/formError";
import { RequestStatus } from "../../../../../enums/requestStatus";

export interface ISignInFormState extends IFormState {
  errors: {
    email: FormError;
    password: FormError;
  };
  fields: {
    email: string;
    password: string;
  };
}

export const defaultSignInFormState = (): ISignInFormState => ({
  errorMessage: "",
  errors: {
    email: FormError.None,
    password: FormError.None
  },
  fields: {
    email: "",
    password: ""
  },
  status: RequestStatus.Idle
});