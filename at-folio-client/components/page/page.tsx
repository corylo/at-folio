import React, { useContext } from "react";
import { Redirect } from "react-router";

import { LoadingSpinner } from "../loading/loadingSpinner";

import { AppContext } from "../app/appWrapper";

import { RequestStatus } from "../../enums/requestStatus";
import { UserStatus } from "../../enums/userStatus";

interface PageProps {
  children: any;
  id: string;
  signInRequired?: boolean;
  status?: RequestStatus;
}

export const Page: React.FC<PageProps> = (props: PageProps) => {
  const { appState } = useContext(AppContext);

  const getContent = (): JSX.Element => {
    if(appState.userStatus === UserStatus.Loading || props.status === RequestStatus.Loading) {
      return (
        <LoadingSpinner wrapperID="page-loading-spinner" />
      )
    }

    return props.children;
  }

  if(props.signInRequired && appState.userStatus === UserStatus.SignedOut) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <div id={props.id} className="page">
      {getContent()}
    </div>
  )
}