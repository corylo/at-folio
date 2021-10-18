import React from "react";
import { Link } from "react-router-dom";

interface ProfileUsernameProps {
  username: string;
}

export const ProfileUsername: React.FC<ProfileUsernameProps> = (props: ProfileUsernameProps) => {
  return (
    <Link className="profile-username rubik-font" to={props.username}>
      @{props.username}
    </Link>
  )
}