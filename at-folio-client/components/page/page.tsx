import React from "react";

import { LoadingSpinner } from "../loading/loadingSpinner";

import { RequestStatus } from "../../../at-folio-enums/requestStatus";

interface PageProps {
  children: any;
  id: string;
  status: RequestStatus;
}

export const Page: React.FC<PageProps> = (props: PageProps) => {
  const getContent = (): JSX.Element => {
    if(props.status === RequestStatus.Loading) {
      return (
        <LoadingSpinner wrapperID="page-loading-spinner" />
      )
    }

    return props.children;
  }

  return (
    <div id={props.id} className="page">
      {getContent()}
    </div>
  )
}