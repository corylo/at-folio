import React from "react";

import { ModalComponent } from "./modalComponent";

import { RequestStatus } from "../../enums/requestStatus";

interface ModalProps {
  children: any;
  contentID?: string;
  status?: RequestStatus;
  title?: string;
  toggled: boolean;
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
        wrapperID={props.wrapperID}
        handleOnBackgroundClick={props.handleOnBackgroundClick}
      >
        {props.children}
      </ModalComponent>
    );
  }

  return null;
}