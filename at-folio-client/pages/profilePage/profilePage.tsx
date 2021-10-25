import React, { useState } from "react";

import { Page } from "../../components/page/page";
import { ProfileBackground } from "../../components/profileBackground/profileBackground";
import { ProfileUsername } from "../../components/profileUsername/profileUsername";
import { SocialPlatformNetwork } from "../../components/socialPlatformNetwork/socialPlatformNetwork";

import { useFetchProfileEffect } from "./effects";

import { defaultProfilePageState, IProfilePageState } from "./models/profilePageState";

export const ProfilePage: React.FC = () => {
  const [state, setState] = useState<IProfilePageState>(defaultProfilePageState());

  const { profile } = state;

  useFetchProfileEffect(state, setState);

  return (
    <Page id="profile-page" status={state.status}>
      <ProfileUsername username={profile.username} wrapperID="profile-page-username-wrapper" />
      <SocialPlatformNetwork 
        id="social-platform-network" 
        links={profile.links} 
        profileImage={profile.profileImage}
      />
      <ProfileBackground image={profile.backgroundImage} />
    </Page>
  )
}