import { IFormState } from "../../../../../models/formState";

import { FirebaseErrorCode } from "../../../../../enums/firebaseErrorCode";
import { FormError } from "../../../../../enums/formError";
import { RequestStatus } from "../../../../../enums/requestStatus";

export interface IUpdateEmailModalState extends IFormState {
  errors: {
    confirmedEmail: FormError;
    email: FormError;
  };
  fields: {
    confirmedEmail: string;
    email: string;
  };
  firebaseErrorCode: FirebaseErrorCode;
}

export const defaultUpdateEmailModalState = (): IUpdateEmailModalState => ({
  errorMessage: "",
  errors: {
    confirmedEmail: FormError.None,
    email: FormError.None
  },
  fields: {
    confirmedEmail: "",
    email: ""
  },
  firebaseErrorCode: FirebaseErrorCode.None,
  status: RequestStatus.Idle
});