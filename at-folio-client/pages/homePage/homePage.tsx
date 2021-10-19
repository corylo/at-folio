import React from "react";

import { Page } from "../../components/page/page";
import { SocialPlatformGridBackground } from "../../components/socialPlatformGridBackground/socialPlatformGridBackground";
import { SignInForm } from "../../components/signInForm/signInForm";

import { RequestStatus } from "../../../at-folio-enums/requestStatus";

export const HomePage: React.FC = () => {
  return (
    <Page id="home-page" status={RequestStatus.Success}>
      <SignInForm wrapperID="home-page-sign-in" />
      <SocialPlatformGridBackground />
    </Page>
  )
}