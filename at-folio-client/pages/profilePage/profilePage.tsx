import React, { useContext } from "react";

import { CreatorGridBackground } from "../../components/creatorGridBackground/creatorGridBackground";
import { Page } from "../../components/page/page";
import { Profile } from "../../components/profile/profile";
import { RequestStatus } from "../../enums/requestStatus";

import { useFetchProfileEffect } from "./effects";

import { ProfilePageContext } from "./profilePageWrapper";

export const ProfilePage: React.FC = () => {
  const { state } = useContext(ProfilePageContext);

  useFetchProfileEffect();

  const getBackground = (): JSX.Element => {
    if(state.status === RequestStatus.Error) {
      return (
        <CreatorGridBackground />
      )
    }
  }

  return (
    <Page id="profile-page" status={state.status} errorMessage={state.errorMessage}>
      <Profile profile={state.profile} />
      {getBackground()}
    </Page>
  )
}