import React from "react";

import { ProfileUsername } from "../profileUsername/profileUsername";
import { WrappableComponent } from "../wrappableComponent/wrappableComponent";

import { IUnsplashPhotoReference } from "../../../at-folio-models/unsplashPhotoReference";

interface ProfileHeaderProps {
  photo: IUnsplashPhotoReference;
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
        {getUsername()}
      </div>
    </WrappableComponent>
  );
}