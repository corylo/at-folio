import React from "react";

import { RequestStatus } from "../../enums/requestStatus";

interface FormBodyProps {
  children: any;
  errorMessage?: string;
  status: RequestStatus;
}

export const FormBody: React.FC<FormBodyProps> = (props: FormBodyProps) => {
  const getErrorMessage = (): JSX.Element => {
    if(props.status === RequestStatus.Error) {
      return (
        <div className="form-error-message">
          <h1 className="rubik-font">{props.errorMessage || "There was an error with the request. Please try again."}</h1>
        </div>
      )
    }
  }

  return (
    <div className="form-body">
      {props.children}
      {getErrorMessage()}
    </div>
  );
}