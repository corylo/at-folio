import React, { useState } from "react";
import { ProfileBackgroundImage } from "../../../at-folio-enums/profileBackgroundImage";

import { BackgroundPicker } from "./components/backgroundPicker/backgroundPicker";
import { Page } from "../../components/page/page";
import { ProfileBackground } from "../../components/profileBackground/profileBackground";
import { ProfileUsername } from "../../components/profileUsername/profileUsername";
import { SocialPlatformNetwork } from "../../components/socialPlatformNetwork/socialPlatformNetwork";

import { useFetchProfileEffect } from "./effects";

import { ProfileUtility } from "../../utilities/profileUtility";

import { defaultProfilePageState, IProfilePageState } from "./models/profilePageState";

export const ProfilePage: React.FC = () => {
  const [state, setState] = useState<IProfilePageState>(defaultProfilePageState());

  const { profile } = state;

  const setBackgroundTo = (background: ProfileBackgroundImage): void => {
    setState({ ...state, profile: { ...profile, background }})
  }

  useFetchProfileEffect(state, setState);

  return (
    <Page id="profile-page" status={state.status}>
      <ProfileUsername 
        username={profile.username} 
        wrapperID="profile-page-username-wrapper" 
      />
      <SocialPlatformNetwork 
        id="social-platform-network" 
        links={profile.links} 
        profileImage={profile.pic}
      />
      <ProfileBackground image={ProfileUtility.getBackgroundImageUrl(profile.background)} />
      <BackgroundPicker 
        wrapperID="profile-background-picker-wrapper" 
        activeBackground={profile.background}
        setBackgroundTo={setBackgroundTo}
      />
    </Page>
  )
}