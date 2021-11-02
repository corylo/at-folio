import React, { useContext } from "react";

import { CreatorGridBackground } from "../../components/creatorGridBackground/creatorGridBackground";
import { Page } from "../../components/page/page";

import { AppContext } from "../../components/app/appWrapper";

import { RequestStatus } from "../../enums/requestStatus";
import { UserStatus } from "../../enums/userStatus";

export const HomePage: React.FC = () => { 
  const { appState } = useContext(AppContext);

  const getContent = (): JSX.Element => {
    if(appState.userStatus === UserStatus.SignedOut) {
      return (        
        <div id="brand-statement">
          <h1 className="rubik-font">A link in bio service that <span className="highlight">has style</span>.</h1>
        </div>
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