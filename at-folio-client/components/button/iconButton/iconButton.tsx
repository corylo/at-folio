import React from "react";
import classNames from "classnames";

import { LoadingIcon } from "../../loading/loadingIcon";

import { RequestStatus } from "../../../enums/requestStatus";

interface IconButtonProps {
  className?: string;
  disabled?: boolean;
  id?: string;
  icon: string;
  label?: string;
  status?: RequestStatus;
  tabIndex?: number;
  handleOnClick: () => void;
}

export const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
  const getLabel = (): JSX.Element => {
    if(props.label && props.status !== RequestStatus.Loading) {
      return (
        <h1 className="rubik-font">{props.label}</h1>
      )
    }
  }

  const getIcon = (): JSX.Element => {
    if(props.status === RequestStatus.Loading) {
      return (
        <LoadingIcon />
      )
    }

    return (
      <i className={props.icon} />
    )
  }

  return (
    <button 
      className={classNames("icon-button", props.className)} 
      disabled={props.disabled || props.status === RequestStatus.Loading || false}
      id={props.id}
      tabIndex={props.tabIndex || 0}
      type="button" 
      onClick={props.handleOnClick}
    >
      {getIcon()}
      {getLabel()}
    </button>
  );
}