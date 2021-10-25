import React, { useContext } from "react";

import { Page } from "../../components/page/page";
import { SocialPlatformGridBackground } from "../../components/socialPlatformGridBackground/socialPlatformGridBackground";
import { SignInForm } from "../../components/signInForm/signInForm";

import { AppContext } from "../../components/app/appWrapper";

import { RequestStatus } from "../../enums/requestStatus";
import { UserStatus } from "../../enums/userStatus";

export const HomePage: React.FC = () => {
  const { appState } = useContext(AppContext);

  const getContent = (): JSX.Element => {
    if(appState.userStatus === UserStatus.SignedIn) {
      return (
        <div />
      )
    }
    
    return (        
      <React.Fragment>        
        <SignInForm wrapperID="home-page-sign-in" />
        <SocialPlatformGridBackground />
      </React.Fragment>
    )
  }

  return (
    <Page id="home-page" status={RequestStatus.Success}>
      {getContent()}
    </Page>
  )
}