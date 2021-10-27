import React, { useState } from "react";

import { Page } from "../../components/page/page";
import { Profile } from "../../components/profile/profile";

import { useFetchProfileEffect } from "./effects";

import { defaultProfilePageState, IProfilePageState } from "./models/profilePageState";

export const ProfilePage: React.FC = () => {
  const [state, setStateTo] = useState<IProfilePageState>(defaultProfilePageState());

  useFetchProfileEffect(state, setStateTo);

  return (
    <Page id="profile-page" status={state.status}>
      <Profile profile={state.profile} />
    </Page>
  )
}