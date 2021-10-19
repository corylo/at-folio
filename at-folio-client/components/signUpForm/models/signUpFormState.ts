import { IFormState } from "../../../models/formState";

import { FormError } from "../../../enums/formError";
import { RequestStatus } from "../../../enums/requestStatus";

export interface ISignUpFormState extends IFormState {
  errors: {
    email: FormError;
    password: FormError;
  };
  fields: {
    email: string;
    password: string;
  };
}

export const defaultSignUpFormState = (): ISignUpFormState => ({
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