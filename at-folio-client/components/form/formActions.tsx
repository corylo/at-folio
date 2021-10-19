import React from "react";

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
      return props.actions.map((action: IFormAction, index: number) => {
        return (
          <button 
            key={index}
            type="button" 
            className="button rubik-font" 
            disabled={props.status === RequestStatus.Loading}
            onClick={action.handleOnClick}
          >
            {props.status === RequestStatus.Loading ? <i className="fas fa-spinner-third spin-animation" /> : action.label}
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