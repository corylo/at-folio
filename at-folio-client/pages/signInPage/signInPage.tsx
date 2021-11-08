import React, { useContext } from "react";
import { Redirect } from "react-router";

import { AuthPageBackground } from "../../components/authPageBackground/authPageBackground";
import { Page } from "../../components/page/page";
import { SignInForm } from "./components/signInForm/signInForm";

import { AppContext } from "../../components/app/appWrapper";

import { RequestStatus } from "../../enums/requestStatus";
import { UserStatus } from "../../enums/userStatus";

export const SignInPage: React.FC = () => {
  const { userStatus } = useContext(AppContext);

  if(userStatus === UserStatus.SignedIn) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <Page id="sign-in-page" status={RequestStatus.Success}>
      <SignInForm />
      <AuthPageBackground />
    </Page>
  )
}