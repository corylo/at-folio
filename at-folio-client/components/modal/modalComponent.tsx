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
  wrapperClass?: string;
  wrapperID?: string;
  handleOnBackgroundClick?: () => void;
}

export const ModalComponent: React.FC<ModalComponentProps> = (props: ModalComponentProps) => {
  const getTitle = (): JSX.Element => {
    if(props.title) {
      return (
        <h1 className="modal-title rubik-font">{props.title}</h1>
      )
    }
  }

  const getBackgroundClickListener = (): JSX.Element => {
    if(props.handleOnBackgroundClick) {
      return (
        <div className="modal-background-click-listener" onClick={props.handleOnBackgroundClick} />
      )
    }
  }

  const classes: string = classNames(
    "modal-wrapper", 
    "scroll-bar", 
    props.wrapperClass,
    props.status ? props.status.toLowerCase() : null  
  );

  return ReactDOM.createPortal(    
    <div id={props.wrapperID} className={classes}>
      {getBackgroundClickListener()}
      <div id={props.contentID} className="modal">
        {getTitle()}
        {props.children}
      </div>
      <LoadingSpinner />
    </div>,
    document.body
  );
}