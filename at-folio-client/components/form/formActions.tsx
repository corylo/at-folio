import React from "react";

import { LoadingIcon } from "../loading/loadingIcon";

import { IFormAction } from "../../models/formAction";

import { RequestStatus } from "../../enums/requestStatus";

interface FormActionsProps {
  actions?: IFormAction[];
  children?: any;
  status: RequestStatus;
}

export const FormActions: React.FC<FormActionsProps> = (props: FormActionsProps) => {
  const getActions = (): JSX.Element[] => {
    if(props.actions) {
      return props.actions.map((action: IFormAction) => {
        return (
          <button 
            key={action.id}
            type="button" 
            className="button rubik-font" 
            disabled={props.status === RequestStatus.Loading}
            onClick={action.handleOnClick}
          >
            {props.status === RequestStatus.Loading ? <LoadingIcon /> : action.label}
          </button>
        )
      });
    }
  }

  return (
    <div className="form-actions">
      {getActions()}
      {props.children || null}
    </div>
  );
}