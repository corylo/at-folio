import React from "react";

import { ProfileBackground } from "../profileBackground/profileBackground";
import { ProfileUsername } from "../profileUsername/profileUsername";
import { SocialPlatformNetwork } from "../socialPlatformNetwork/socialPlatformNetwork";

import { ProfileUtility } from "../../utilities/profileUtility";

import { IProfile } from "../../../at-folio-models/profile";

import { ProfileImageOption } from "../../../at-folio-enums/profileImageOption";

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
    if(profile.image !== "") {
      return (
        <SocialPlatformNetwork 
          id="social-platform-network"
          profile={profile} 
        />
      )
    }
  }

  const getBackground = (): JSX.Element => {
    if(profile.background !== ProfileImageOption.None) {
      return (                
        <ProfileBackground image={ProfileUtility.getImageUrl(profile.background)} />        
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