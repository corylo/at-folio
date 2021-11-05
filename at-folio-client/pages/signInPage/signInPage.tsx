import React, { useContext } from "react";
import { Redirect } from "react-router";

import { CreatorGridBackground } from "../../components/creatorGridBackground/creatorGridBackground";
import { Page } from "../../components/page/page";
import { SignInForm } from "../../components/signInForm/signInForm";
import { SvgBackground } from "../../components/svgBackground/svgBackground";

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
      <SignInForm wrapperID="sign-in-form-wrapper" />
      <CreatorGridBackground />
      <SvgBackground wrapperID="sign-in-svg" />
    </Page>
  )
}