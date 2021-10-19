import React, { useContext } from "react";
import { Redirect } from "react-router";

import { Page } from "../../components/page/page";
import { SignUpForm } from "../../components/signUpForm/signUpForm";
import { SocialPlatformGridBackground } from "../../components/socialPlatformGridBackground/socialPlatformGridBackground";

import { AppContext } from "../../components/app/appWrapper";

import { UserStatus } from "../../enums/userStatus";


export const SignUpPage: React.FC = () => {
  const { appState } = useContext(AppContext);

  if(appState.userStatus === UserStatus.SignedIn) {
    return (
      <Redirect to="/" />
    )
  }

  return (  
    <Page id="sign-up-page">
      <SignUpForm wrapperID="sign-up" />
      <SocialPlatformGridBackground />
    </Page>
  );
}