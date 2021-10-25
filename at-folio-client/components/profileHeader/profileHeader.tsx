import React from "react";

import { ProfileImage } from "../profileImage/profileImage";
import { ProfileUsername } from "../profileUsername/profileUsername";
import { WrappableComponent } from "../wrappableComponent/wrappableComponent";

interface ProfileHeaderProps {
  image: string;
  username: string;  
  wrapperID?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = (props: ProfileHeaderProps) => {
  return (
    <WrappableComponent wrapperID={props.wrapperID}>
      <div className="profile-header">
        <ProfileImage image={props.image} />
        <ProfileUsername username={props.username} />
      </div>
    </WrappableComponent>
  );
}