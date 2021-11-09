import { IFormState } from "../../../../../models/formState";

import { FirebaseErrorCode } from "../../../../../enums/firebaseErrorCode";
import { FormError } from "../../../../../enums/formError";
import { RequestStatus } from "../../../../../enums/requestStatus";

export interface IUpdatePasswordModalState extends IFormState {
  errors: {
    confirmedPassword: FormError;
    password: FormError;
  };
  fields: {
    confirmedPassword: string;
    password: string;
  };
  firebaseErrorCode: FirebaseErrorCode;
}

export const defaultUpdatePasswordModalState = (): IUpdatePasswordModalState => ({
  errorMessage: "",
  errors: {
    confirmedPassword: FormError.None,
    password: FormError.None
  },
  fields: {
    confirmedPassword: "",
    password: ""
  },
  firebaseErrorCode: FirebaseErrorCode.None,
  status: RequestStatus.Idle
});