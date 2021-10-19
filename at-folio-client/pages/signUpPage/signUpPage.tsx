import React from "react";

import { Page } from "../../components/page/page";
import { SignUpForm } from "../../components/signUpForm/signUpForm";
import { SocialPlatformGridBackground } from "../../components/socialPlatformGridBackground/socialPlatformGridBackground";

export const SignUpPage: React.FC = () => {
  return (    
    <Page id="sign-up-page">
      <SignUpForm wrapperID="sign-up" />
      <SocialPlatformGridBackground />
    </Page>
  );
}