import React, { useContext } from "react";

import { CreatorGridBackground } from "../../components/creatorGridBackground/creatorGridBackground";
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
    { state } = useContext(AdminPageContext);

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
      return (
        <React.Fragment>
          <SettingsWrapper />
          <ProfileTutorial />
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