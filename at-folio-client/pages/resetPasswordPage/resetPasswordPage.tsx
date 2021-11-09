import React from "react";

import { AuthPageBackground } from "../../components/authPageBackground/authPageBackground";
import { Page } from "../../components/page/page";
import { ResetPasswordForm } from "./components/resetPasswordForm/resetPasswordForm";

import { RequestStatus } from "../../enums/requestStatus";

export const ResetPasswordPage: React.FC = () => {
  return (
    <Page id="reset-password-page" status={RequestStatus.Success} signOutRequired>      
      <ResetPasswordForm />
      <AuthPageBackground />
    </Page>
  )
}