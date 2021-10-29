import { IFormState } from "../../../../../models/formState";
import { ILink } from "../../../../../../at-folio-models/link";

import { FormError } from "../../../../../enums/formError";
import { RequestStatus } from "../../../../../enums/requestStatus";
import { SocialPlatform } from "../../../../../../at-folio-enums/socialPlatform";

export interface ILinkFormState extends IFormState {
  errors: {
    platform: FormError;
    url: FormError;
  };
  fields: {
    platform: SocialPlatform;
    url: string;
  };
}

export const defaultLinkFormState = (link?: ILink): ILinkFormState => ({
  errorMessage: "",
  errors: {
    platform: FormError.None,
    url: FormError.None
  },
  fields: {
    platform: link ? link.platform : SocialPlatform.None,
    url: link ? link.url : ""
  },
  status: RequestStatus.Idle
});