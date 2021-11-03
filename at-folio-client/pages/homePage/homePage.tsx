import React, { useContext } from "react";

import { BrandStatement } from "../../components/brandStatement/brandStatement";
import { CreatorGridBackground } from "../../components/creatorGridBackground/creatorGridBackground";
import { GettingStarted } from "../../components/gettingStarted/gettingStarted";
import { Page } from "../../components/page/page";

import { AppContext } from "../../components/app/appWrapper";

import { RequestStatus } from "../../enums/requestStatus";
import { UserStatus } from "../../enums/userStatus";

export const HomePage: React.FC = () => { 
  const { userStatus } = useContext(AppContext);

  const getContent = (): JSX.Element => {
    if(userStatus === UserStatus.SignedIn) {
      return (
        <GettingStarted />
      )
    } else if (userStatus === UserStatus.SignedOut) {
      return (
        <BrandStatement />
      ) 
    }
  }

  return (
    <Page id="home-page" status={RequestStatus.Success}>
      {getContent()}
      <CreatorGridBackground />
    </Page>
  )
}