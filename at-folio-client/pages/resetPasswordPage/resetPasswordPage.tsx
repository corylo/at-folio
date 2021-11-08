import React, { useContext } from "react";
import { Redirect } from "react-router";

import { AuthPageBackground } from "../../components/authPageBackground/authPageBackground";
import { Page } from "../../components/page/page";
import { ResetPasswordForm } from "./components/resetPasswordForm/resetPasswordForm";

import { AppContext } from "../../components/app/appWrapper";

import { RequestStatus } from "../../enums/requestStatus";
import { UserStatus } from "../../enums/userStatus";

export const ResetPasswordPage: React.FC = () => {
  const { userStatus } = useContext(AppContext);

  if(userStatus === UserStatus.SignedIn) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <Page id="reset-password-page" status={RequestStatus.Success}>      
      <ResetPasswordForm wrapperID="reset-password-form-wrapper" />
      <AuthPageBackground />
    </Page>
  )
}