import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { BrandStatement } from "../../components/brandStatement/brandStatement";
import { CreatorGridBackground } from "../../components/creatorGridBackground/creatorGridBackground";
import { GettingStarted } from "../../components/gettingStarted/gettingStarted";
import { GettingStartedStep } from "../../components/gettingStarted/gettingStartedStep";
import { Page } from "../../components/page/page";

import { AppContext } from "../../components/app/appWrapper";

import { RequestStatus } from "../../enums/requestStatus";
import { UserStatus } from "../../enums/userStatus";

export const HomePage: React.FC = () => { 
  const { profile, userStatus } = useContext(AppContext);

  const getContent = (): JSX.Element => {
    if(
      userStatus === UserStatus.SignedIn && 
      (profile.username === "" || profile.background.id === "" || profile.photo.id === "")
    ) {
      return (
        <GettingStarted>          
          <GettingStartedStep>
            1. Choose a <span className="highlight">username</span>.
          </GettingStartedStep>        
          <GettingStartedStep>
            2. Select your <span className="highlight">pics</span>.
          </GettingStartedStep>
          <GettingStartedStep>
            3. Add your <span className="highlight">links</span>.
          </GettingStartedStep>
          <Link 
            to="/me"
            className="get-started-link link rubik-font" 
          >
            Get started
          </Link>
        </GettingStarted>
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