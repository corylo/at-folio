import React from "react";
import { Link } from "react-router-dom";

import { WrappableComponent } from "../wrappableComponent/wrappableComponent";

interface ProfileUsernameProps {
  username: string;
  wrapperID?: string;
}

export const ProfileUsername: React.FC<ProfileUsernameProps> = (props: ProfileUsernameProps) => {  
  return (
    <WrappableComponent wrapperID={props.wrapperID}>
      <Link className="profile-username rubik-font" to={props.username}>
        @{props.username}
      </Link>
    </WrappableComponent>
  )
}