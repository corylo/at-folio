import { FormError } from "../enums/formError";
import { RequestStatus } from "../enums/requestStatus";

export interface IFormState {
  errorMessage: string;
  errors: {
    [key: string]: FormError;
  };
  fields: {
    [key: string]: string | number;
  };
  status: RequestStatus;
}