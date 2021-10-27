import { IFormState } from "../../../../../models/formState";

import { FormError } from "../../../../../enums/formError";
import { ProfileBackgroundImage } from "../../../../../../at-folio-enums/profileBackgroundImage";
import { RequestStatus } from "../../../../../enums/requestStatus";

export interface IInitialSetupState extends IFormState {
  errors: {
    background: FormError;
    username: FormError;
  };
  fields: {
    background: ProfileBackgroundImage;
    username: string;
  };
}

export const defaultInitialSetupState = (): IInitialSetupState => ({
  errorMessage: "",
  errors: {
    background: FormError.None,
    username: FormError.None
  },
  fields: {
    background: ProfileBackgroundImage.None,
    username: ""
  },
  status: RequestStatus.Idle
});