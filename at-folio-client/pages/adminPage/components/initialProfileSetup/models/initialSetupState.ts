import { IFormState } from "../../../../../models/formState";

import { FormError } from "../../../../../enums/formError";
import { ProfileImageOption } from "../../../../../../at-folio-enums/profileImageOption";
import { RequestStatus } from "../../../../../enums/requestStatus";

export interface IInitialSetupState extends IFormState {
  errors: {
    background: FormError;
    image: FormError;
    username: FormError;
  };
  fields: {
    background: ProfileImageOption;
    image: ProfileImageOption;
    username: string;
  };
}

export const defaultInitialSetupState = (): IInitialSetupState => ({
  errorMessage: "",
  errors: {
    background: FormError.None,
    image: FormError.None,
    username: FormError.None
  },
  fields: {
    background: ProfileImageOption.None,
    image: ProfileImageOption.None,
    username: ""
  },
  status: RequestStatus.Idle
});