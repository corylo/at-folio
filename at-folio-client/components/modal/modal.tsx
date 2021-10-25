import React from "react";

import { ModalComponent } from "./modalComponent";

import { RequestStatus } from "../../enums/requestStatus";

interface ModalProps {
  children: any;
  contentID?: string;
  status?: RequestStatus;
  toggled: boolean;
  wrapperID?: string;
}

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  if(props.toggled) {
    return (
      <ModalComponent 
        contentID={props.contentID} 
        status={props.status}
        wrapperID={props.wrapperID}
      >
        {props.children}
      </ModalComponent>
    );
  }

  return null;
}