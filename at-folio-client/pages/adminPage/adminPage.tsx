import React, { useContext, useState } from "react";

import { CreatorGridBackground } from "../../components/creatorGridBackground/creatorGridBackground";
import { InitialSetup } from "./components/initialSetup/initialSetup";
import { Page } from "../../components/page/page";
import { Profile } from "../../components/profile/profile";
import { SettingsWrapper } from "./components/settings/settingsWrapper";

import { AppContext } from "../../components/app/appWrapper";

import { useFetchLinksEffect } from "./effects";

import { defaultAdminPageState, IAdminPageState } from "./models/adminPageState";

import { ProfileImageOption } from "../../../at-folio-enums/profileImageOption";
import { RequestStatus } from "../../enums/requestStatus";

export const AdminPage: React.FC = () => {  
  const { appState } = useContext(AppContext);

  const { profile } = appState;

  const [state, setStateTo] = useState<IAdminPageState>(defaultAdminPageState());

  const setStatusTo = (status: RequestStatus): void => {
    setStateTo({ ...state, status });
  }

  useFetchLinksEffect(state, setStatusTo);

  const getContent = (): JSX.Element => {
    if(profile.username === "" || profile.background === ProfileImageOption.None) {
      return (
        <React.Fragment>
          <CreatorGridBackground />
          <InitialSetup />
        </React.Fragment>
      );
    } else {
      return (
        <SettingsWrapper />
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