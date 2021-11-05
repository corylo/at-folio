import { IFormState } from "../../../../../models/formState";
import { ILink } from "../../../../../../at-folio-models/link";

import { FormError } from "../../../../../enums/formError";
import { RequestStatus } from "../../../../../enums/requestStatus";
import { SocialPlatform } from "../../../../../../at-folio-enums/socialPlatform";

export interface ILinkFormState extends IFormState {
  errors: {
    label: FormError;
    platform: FormError;
    url: FormError;
  };
  fields: {
    label: string;
    platform: SocialPlatform;
    url: string;
  };
}

export const defaultLinkFormState = (link?: ILink): ILinkFormState => ({
  errorMessage: "",
  errors: {
    label: FormError.None,
    platform: FormError.None,
    url: FormError.None
  },
  fields: {
    label: link ? link.label : "",
    platform: link ? link.platform : SocialPlatform.None,
    url: link ? link.url : ""
  },
  status: RequestStatus.Idle
});