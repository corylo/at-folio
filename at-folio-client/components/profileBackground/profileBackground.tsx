import React from "react";

import { LoadableImage } from "../loadableImage/loadableImage";

interface ProfileBackgroundProps {
  image: string;
}

export const ProfileBackground: React.FC<ProfileBackgroundProps> = (props: ProfileBackgroundProps) => {
  return (
    <LoadableImage className="profile-background" source={props.image} />
  );
}