import { IFormState } from "../../../../../models/formState";

import { FormError } from "../../../../../enums/formError";
import { RequestStatus } from "../../../../../enums/requestStatus";

export interface IInitialSetupState extends IFormState {
  errors: {
    username: FormError;
  };
  fields: {
    username: string;
  };
}

export const defaultInitialSetupState = (): IInitialSetupState => ({
  errorMessage: "",
  errors: {
    username: FormError.None
  },
  fields: {
    username: ""
  },
  status: RequestStatus.Idle
});