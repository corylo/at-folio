import React from "react";

import { AuthPageBackground } from "../../components/authPageBackground/authPageBackground";
import { Page } from "../../components/page/page";
import { SignUpForm } from "./components/signUpForm/signUpForm";

export const SignUpPage: React.FC = () => {
  return (  
    <Page id="sign-up-page" signOutRequired>
      <SignUpForm />
      <AuthPageBackground />
    </Page>
  );
}