import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import { LoadingSpinner } from "../loading/loadingSpinner";

import { RequestStatus } from "../../enums/requestStatus";

interface ModalComponentProps {
  children: any;
  contentID?: string;
  status?: RequestStatus;
  title?: string;
  wrapperID?: string;
}

export const ModalComponent: React.FC<ModalComponentProps> = (props: ModalComponentProps) => {
  const getTitle = (): JSX.Element => {
    if(props.title) {
      return (
        <h1 className="modal-title rubik-font">{props.title}</h1>
      )
    }
  }

  const classes: string = classNames(
    "modal-wrapper", 
    "scroll-bar", 
    props.status ? props.status.toLowerCase() : null  
  );

  return ReactDOM.createPortal(    
    <div id={props.wrapperID} className={classes}>
      <div id={props.contentID} className="modal">
        {getTitle()}
        {props.children}
      </div>
      <LoadingSpinner />
    </div>,
    document.body
  );
}