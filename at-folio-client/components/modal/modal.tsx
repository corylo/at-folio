import React from "react";

import { ModalComponent } from "./modalComponent";

import { RequestStatus } from "../../enums/requestStatus";

interface ModalProps {
  children: any;
  contentID?: string;
  status?: RequestStatus;
  title?: string;
  toggled: boolean;
  wrapperClass?: string;
  wrapperID?: string;
  handleOnBackgroundClick?: () => void;
}

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  if(props.toggled) {
    return (
      <ModalComponent 
        contentID={props.contentID} 
        status={props.status}
        title={props.title}
        wrapperClass={props.wrapperClass}
        wrapperID={props.wrapperID}
        handleOnBackgroundClick={props.handleOnBackgroundClick}
      >
        {props.children}
      </ModalComponent>
    );
  }

  return null;
}