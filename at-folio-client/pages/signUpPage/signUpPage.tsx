import React, { useContext } from "react";
import { Redirect } from "react-router";

import { CreatorGridBackground } from "../../components/creatorGridBackground/creatorGridBackground";
import { Page } from "../../components/page/page";
import { SignUpForm } from "../../components/signUpForm/signUpForm";
import { SvgBackground } from "../../components/svgBackground/svgBackground";

import { AppContext } from "../../components/app/appWrapper";

import { UserStatus } from "../../enums/userStatus";


export const SignUpPage: React.FC = () => {
  const { userStatus } = useContext(AppContext);

  if(userStatus === UserStatus.SignedIn) {
    return (
      <Redirect to="/" />
    )
  }

  return (  
    <Page id="sign-up-page">
      <SignUpForm wrapperID="sign-up-form-wrapper" />
      <CreatorGridBackground />
      <SvgBackground wrapperID="sign-up-svg" />
    </Page>
  );
}