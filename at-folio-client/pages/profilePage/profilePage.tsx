import React, { useContext } from "react";

import { Page } from "../../components/page/page";
import { Profile } from "../../components/profile/profile";

import { useFetchProfileEffect } from "./effects";

import { ProfilePageContext } from "./profilePageWrapper";

export const ProfilePage: React.FC = () => {
  const { state } = useContext(ProfilePageContext);

  useFetchProfileEffect();

  return (
    <Page id="profile-page" status={state.status} errorMessage={state.errorMessage}>
      <Profile profile={state.profile} />
    </Page>
  )
}