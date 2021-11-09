import { IFormState } from "../../../../../models/formState";

import { FormError } from "../../../../../enums/formError";
import { RequestStatus } from "../../../../../enums/requestStatus";

export interface IReauthFormState extends IFormState {
  errors: {
    password: FormError;
  };
  fields: {
    password: string;
  };
}

export const defaultReauthFormState = (): IReauthFormState => ({
  errorMessage: "",
  errors: {
    password: FormError.None
  },
  fields: {
    password: ""
  },
  status: RequestStatus.Idle
});