import React from "react";

import { AuthPageBackground } from "../../components/authPageBackground/authPageBackground";
import { Page } from "../../components/page/page";
import { SignInForm } from "./components/signInForm/signInForm";

import { RequestStatus } from "../../enums/requestStatus";

export const SignInPage: React.FC = () => {
  return (
    <Page id="sign-in-page" status={RequestStatus.Success} signOutRequired>
      <SignInForm />
      <AuthPageBackground />
    </Page>
  )
}