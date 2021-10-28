import React from "react";

import { ProfileImage } from "../profileImage/profileImage";
import { ProfileUsername } from "../profileUsername/profileUsername";
import { WrappableComponent } from "../wrappableComponent/wrappableComponent";

import { ProfileImageOption } from "../../../at-folio-enums/profileImageOption";

interface ProfileHeaderProps {
  image: ProfileImageOption;
  username: string;  
  wrapperID?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = (props: ProfileHeaderProps) => {
  const getUsername = (): JSX.Element => {
    if(props.username) {
      return (
        <ProfileUsername username={props.username} />
      )
    }
  }

  return (
    <WrappableComponent wrapperID={props.wrapperID}>
      <div className="profile-header">
        <ProfileImage image={props.image} />
        {getUsername()}
      </div>
    </WrappableComponent>
  );
}