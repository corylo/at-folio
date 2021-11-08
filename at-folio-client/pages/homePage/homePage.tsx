import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { BrandStatement } from "../../components/brandStatement/brandStatement";
import { CreatorGridBackground } from "../../components/creatorGridBackground/creatorGridBackground";
import { GettingStarted } from "../../components/gettingStarted/gettingStarted";
import { GettingStartedStep } from "../../components/gettingStarted/gettingStartedStep";
import { HomePageMenu } from "./components/homePageMenu/homePageMenu";
import { Page } from "../../components/page/page";

import { AppContext } from "../../components/app/appWrapper";

import { RequestStatus } from "../../enums/requestStatus";
import { UserStatus } from "../../enums/userStatus";

export const HomePage: React.FC = () => { 
  const { profile, userStatus } = useContext(AppContext);

  const getContent = (): JSX.Element => {
    if(userStatus === UserStatus.SignedIn) {
      if(profile.username === "" || profile.background.id === "" || profile.photo.id === "") {
        return (
          <GettingStarted>          
            <GettingStartedStep index={1} description="Any name your heart desires (well, almost)">
              Pick a username
            </GettingStartedStep>        
            <GettingStartedStep index={2} description="Choose a profile photo and background">
              Choose your photos
            </GettingStartedStep>
            <GettingStartedStep index={3} description="You can add up to 10 links">
              Add your links
            </GettingStartedStep>
            <Link 
              to="/me"
              className="get-started-link link rubik-font" 
            >
              Get started
            </Link>
          </GettingStarted>
        )
      }

      return (
        <HomePageMenu />
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