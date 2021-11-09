import { IFormState } from "../../../../../models/formState";

import { FirebaseErrorCode } from "../../../../../enums/firebaseErrorCode";
import { FormError } from "../../../../../enums/formError";
import { RequestStatus } from "../../../../../enums/requestStatus";

export interface IDeleteAccountModalState extends IFormState {
  errors: {
    confirmText: FormError;
  };
  fields: {
    confirmText: string;
  };
  firebaseErrorCode: FirebaseErrorCode;
}

export const defaultDeleteAccountModalState = (): IDeleteAccountModalState => ({
  errorMessage: "",
  errors: {
    confirmText: FormError.None
  },
  fields: {
    confirmText: ""
  },
  firebaseErrorCode: FirebaseErrorCode.None,
  status: RequestStatus.Idle
});