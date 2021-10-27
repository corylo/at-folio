import React from "react";
import classNames from "classnames";

import { FormUtility } from "../../utilities/formUtility";

import { FormError } from "../../enums/formError";

interface InputProps {
  children: any;
  className?: string;
  error?: FormError;
  label?: string;
}

export const Input: React.FC<InputProps> = (props: InputProps) => {
  const getInfo = (): JSX.Element => {
    if(props.error || props.label) {
      const getLabel = (): JSX.Element => {
        if(props.label) {
          return (
            <h1 className="input-label rubik-font">{props.label}</h1>      
          )
        }
      }

      const getError = (): JSX.Element => {
        if(props.error) {
          return (
            <h1 className="input-error rubik-font">{FormUtility.getErrorMessage(props.error)}</h1>
          )
        }
      }

      return (
        <div className="input-info">  
          {getLabel()}
          {getError()}
        </div>
      )
    }
  }

  return (
    <div className={classNames("input", props.className, { error: props.error !== undefined && props.error !== FormError.None })}>
      <div className="input-content">
        {props.children}
      </div>
      {getInfo()}
    </div>
  );
}