import React, { useContext } from "react";
import { Redirect } from "react-router";

import { Page } from "../../components/page/page";
import { SocialPlatformGridBackground } from "../../components/socialPlatformGridBackground/socialPlatformGridBackground";
import { SignInForm } from "../../components/signInForm/signInForm";

import { AppContext } from "../../components/app/appWrapper";

import { RequestStatus } from "../../enums/requestStatus";
import { UserStatus } from "../../enums/userStatus";

export const SignInPage: React.FC = () => {
  const { appState } = useContext(AppContext);

  if(appState.userStatus === UserStatus.SignedIn) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <Page id="sign-in-page" status={RequestStatus.Success}>
      <SignInForm wrapperID="sign-in-form-wrapper" />
      <SocialPlatformGridBackground />
    </Page>
  )
}