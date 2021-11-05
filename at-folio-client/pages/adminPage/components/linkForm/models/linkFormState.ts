import { IFormState } from "../../../../../models/formState";
import { ILink } from "../../../../../../at-folio-models/link";

import { FormError } from "../../../../../enums/formError";
import { RequestStatus } from "../../../../../enums/requestStatus";

export interface ILinkFormState extends IFormState {
  errors: {
    label: FormError;
    platform: FormError;
    url: FormError;
  };
  fields: {
    label: string;
    platform: string;
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
    platform: link ? link.platform : "",
    url: link ? link.url : ""
  },
  status: RequestStatus.Idle
});