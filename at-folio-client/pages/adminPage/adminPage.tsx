import React, { useContext, useState } from "react";

import { CreatorGridBackground } from "../../components/creatorGridBackground/creatorGridBackground";
import { InitialSetup } from "./components/initialSetup/initialSetup";
import { Page } from "../../components/page/page";
import { Profile } from "../../components/profile/profile";

import { AppContext } from "../../components/app/appWrapper";

import { useFetchLinksEffect } from "./effects";

import { defaultAdminPageState, IAdminPageState } from "./models/adminPageState";

import { ProfileBackgroundImage } from "../../../at-folio-enums/profileBackgroundImage";
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
    console.log(profile)
    if(profile.username === "" || profile.background === ProfileBackgroundImage.None) {
      return (
        <React.Fragment>
          <CreatorGridBackground />
          <InitialSetup />
        </React.Fragment>
      )
    }
  }

  return (
    <Page id="admin-page" status={state.status}>
      <Profile profile={profile} />
      {getContent()}
    </Page>
  )
}