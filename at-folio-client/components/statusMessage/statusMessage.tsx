import React from "react";
import classNames from "classnames";

import { WrappableComponent } from "../wrappableComponent/wrappableComponent";

import { RequestStatus } from "../../enums/requestStatus";

interface StatusMessageProps {
  activeStatuses: RequestStatus[];
  icon?: string | true;
  status: RequestStatus;
  text: string;
  wrapperClass?: string | true;
}

export const StatusMessage: React.FC<StatusMessageProps> = (props: StatusMessageProps) => {  
  if(props.activeStatuses.includes(props.status)) {
    const getIcon = (): JSX.Element => {
      if(props.icon !== undefined) {
        if(props.icon === true) {
          switch(props.status) {
            case RequestStatus.Success:
              return <i className="fa-regular fa-check" />;
            case RequestStatus.Error:
              return <i className="fa-regular fa-xmark" />;
            default:
              return null;
          }
        }

        return <i className={props.icon.toString()} />;
      }
    }

    return (
      <WrappableComponent wrapperClass={props.wrapperClass} defaultWrapperClass="default-status-message-wrapper">
        <h1 className={classNames("status-message", "rubik-font", props.status.toLowerCase())}>{getIcon()}{props.text}</h1>
      </WrappableComponent>
    );
  }

  return null;
}