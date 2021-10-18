import React from "react";

interface ProfileBackgroundProps {
  image: string;
}

export const ProfileBackground: React.FC<ProfileBackgroundProps> = (props: ProfileBackgroundProps) => {
  return (
    <div id="profile-background" style={{ backgroundImage: `url(${props.image})` }} />
  )
}