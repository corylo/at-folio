import { FormError } from "../enums/formError";
import { RequestStatus } from "../enums/requestStatus";

export interface IFormState {
  errors: {
    [key: string]: FormError;
  };
  fields: {
    [key: string]: string | number;
  };
  status: RequestStatus;
}