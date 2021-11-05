import React, { useContext } from "react";

import { CreatorGridBackground } from "../../components/creatorGridBackground/creatorGridBackground";
import { GettingStarted } from "../../components/gettingStarted/gettingStarted";
import { GettingStartedStep } from "../../components/gettingStarted/gettingStartedStep";
import { InitialProfileSetup } from "./components/initialProfileSetup/initialProfileSetup";
import { Page } from "../../components/page/page";
import { Profile } from "../../components/profile/profile";
import { ProfileTutorial } from "./components/profileTutorial/profileTutorial";
import { SettingsWrapper } from "./components/settings/settingsWrapper";

import { AdminPageContext } from "./adminPageWrapper";
import { AppContext } from "../../components/app/appWrapper";

import { useFetchLinksEffect, useToggleTutorialEffect } from "./effects";

export const AdminPage: React.FC = () => {  
  const { profile } = useContext(AppContext),
    { state, setStateTo } = useContext(AdminPageContext);

  useFetchLinksEffect();

  useToggleTutorialEffect();

  const getContent = (): JSX.Element => {
    if(profile.username === "") {
      return (
        <React.Fragment>
          <CreatorGridBackground />
          <InitialProfileSetup />
        </React.Fragment>
      );
    } else {
      const getGettingStarted = (): JSX.Element => {
        if(profile.background.id === "" && profile.background.id === "") {
          return (            
            <GettingStarted>          
              <GettingStartedStep>
                1. Select your <span className="highlight">photo</span>.
              </GettingStartedStep>        
              <GettingStartedStep>
                2. Select your <span className="highlight">background</span>.
              </GettingStartedStep>
              <GettingStartedStep>
                3. Add your <span className="highlight">links</span>.
              </GettingStartedStep>
              <button 
                className="button rubik-font" 
                onClick={() => setStateTo({ ...state, tutorialToggled: true })}
              >
                Tutorial
              </button>
            </GettingStarted>
          )
        }
      }

      return (
        <React.Fragment>
          <SettingsWrapper />
          <ProfileTutorial />
          {getGettingStarted()}
        </React.Fragment>
      );
    }
  }

  return (
    <Page id="admin-page" status={state.status} signInRequired>
      <Profile profile={profile} />
      {getContent()}
    </Page>
  )
}