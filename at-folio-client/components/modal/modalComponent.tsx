import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import { LoadingSpinner } from "../loading/loadingSpinner";

import { RequestStatus } from "../../enums/requestStatus";

interface ModalComponentProps {
  children: any;
  contentID?: string;
  status?: RequestStatus;
  wrapperID?: string;
}

export const ModalComponent: React.FC<ModalComponentProps> = (props: ModalComponentProps) => {
  return ReactDOM.createPortal(    
    <div id={props.wrapperID} className={classNames("modal-wrapper", props.status ? props.status.toLowerCase() : null)}>
      <div id={props.contentID} className="modal">
        {props.children}
      </div>
      <LoadingSpinner />
    </div>,
    document.body
  );
}