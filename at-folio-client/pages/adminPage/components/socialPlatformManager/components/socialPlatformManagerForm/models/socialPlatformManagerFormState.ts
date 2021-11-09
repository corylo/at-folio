import { IFormState } from "../../../../../../../models/formState";

import { FormError } from "../../../../../../../enums/formError";
import { RequestStatus } from "../../../../../../../enums/requestStatus";

export interface ISocialPlatformManagerFormState extends IFormState {
  errors: {
    text: FormError;
  };
  fields: {
    text: string;
  };
}

export const defaultSocialPlatformManagerFormState = (text?: string): ISocialPlatformManagerFormState => ({
  errorMessage: "",
  errors: {
    text: FormError.None
  },
  fields: {
    text: text || ""
  },
  status: RequestStatus.Idle
});