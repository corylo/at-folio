import { IFormState } from "../../../../../models/formState";

import { FormError } from "../../../../../enums/formError";
import { RequestStatus } from "../../../../../enums/requestStatus";
import { SocialPlatform } from "../../../../../../at-folio-enums/socialPlatform";

export interface IAddLinkFormState extends IFormState {
  errors: {
    platform: FormError;
    url: FormError;
  };
  fields: {
    platform: SocialPlatform;
    url: string;
  };
}

export const defaultAddLinkFormState = (): IAddLinkFormState => ({
  errorMessage: "",
  errors: {
    platform: FormError.None,
    url: FormError.None
  },
  fields: {
    platform: SocialPlatform.None,
    url: ""
  },
  status: RequestStatus.Idle
});