import React from "react";

import { LoadingIcon } from "../../../../components/loading/loadingIcon";

import { RequestStatus } from "../../../../enums/requestStatus";

interface AdminPageSectionProps {
  children: any;
  id: string;
  status: RequestStatus;
  title?: string;
}

export const AdminPageSection: React.FC<AdminPageSectionProps> = (props: AdminPageSectionProps) => {  
  const getTitle = (): JSX.Element => {
    if(props.title) {
      return (
        <h1 className="admin-page-section-title rubik-font">{props.title}</h1>
      )
    }
  }

  const getContent = (): JSX.Element => {
    if(props.status === RequestStatus.Success) {
      return props.children;
    } else if (props.status === RequestStatus.Loading) {
      return (        
        <LoadingIcon wrapperClass="admin-page-section-loading-icon" />
      )
    }
  }

  return (
    <div id={props.id} className="admin-page-section">    
      {getTitle()}
      <div className="admin-page-section-content">
      {getContent()}
      </div>
    </div>
  )
}