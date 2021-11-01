import React from "react";

import { ProfileBackground } from "../profileBackground/profileBackground";
import { ProfileUsername } from "../profileUsername/profileUsername";
import { SocialPlatformNetwork } from "../socialPlatformNetwork/socialPlatformNetwork";

import { IProfile } from "../../../at-folio-models/profile";

interface ProfileProps {
  profile: IProfile;
}

export const Profile: React.FC<ProfileProps> = (props: ProfileProps) => { 
  const { profile } = props;

  const getUsername = (): JSX.Element => {
    if(profile.username !== "") {
      return (
        <ProfileUsername 
          username={profile.username} 
          wrapperID="profile-username-wrapper" 
        />
      )
    }
  }

  const getNetwork = (): JSX.Element => {
    if(profile.photo.id !== "") {
      return (
        <SocialPlatformNetwork 
          id="social-platform-network"
          profile={profile} 
        />
      )
    }
  }

  const getBackground = (): JSX.Element => {
    if(profile.background.id !== "") {
      return (                
        <ProfileBackground photo={profile.background} />        
      )
    }
  }

  return (
    <React.Fragment>
      {getUsername()}
      {getNetwork()}
      {getBackground()}
    </React.Fragment>
  );
}