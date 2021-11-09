import React, { useContext } from "react";

import { CreatorGridBackground } from "../../components/creatorGridBackground/creatorGridBackground";
import { GettingStarted } from "../../components/gettingStarted/gettingStarted";
import { GettingStartedStep } from "../../components/gettingStarted/gettingStartedStep";
import { InitialProfileSetup } from "./components/initialProfileSetup/initialProfileSetup";
import { Page } from "../../components/page/page";
import { Profile } from "../../components/profile/profile";
import { ProfileTutorial } from "./components/profileTutorial/profileTutorial";
import { SettingsWrapper } from "./components/settings/settingsWrapper";

import { AppContext } from "../../components/app/appWrapper";
import { ProfileManagerPageContext } from "./profileManagerPageWrapper";

import { useFetchLinksEffect, useToggleTutorialEffect } from "./effects";

export const ProfileManagerPage: React.FC = () => {  
  const { profile } = useContext(AppContext),
    { state, setStateTo } = useContext(ProfileManagerPageContext);

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
        if(profile.photo.id === "" && profile.background.id === "") {
          return (  
            <GettingStarted>          
              <GettingStartedStep index={1} description="Your links wont show up until you select a photo">
                Choose your profile photo
              </GettingStartedStep>        
              <GettingStartedStep index={2} description="You can always change this later">
                Choose your background
              </GettingStartedStep>
              <GettingStartedStep index={3} description="You can add up to 10 links">
                Add your links
              </GettingStartedStep>
              <button 
                className="button rubik-font" 
                onClick={() => setStateTo({ ...state, tutorialToggled: true })}
              >
                View tutorial
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
    <Page id="profile-manager-page" status={state.status} signInRequired>
      <Profile profile={profile} />
      {getContent()}
    </Page>
  )
}