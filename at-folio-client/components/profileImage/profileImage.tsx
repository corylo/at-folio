import React from "react";

import { LoadableImage } from "../loadableImage/loadableImage";

interface ProfileImageProps {
  image: string;
  handleOnClick?: () => void;
}

export const ProfileImage: React.FC<ProfileImageProps> = (props: ProfileImageProps) => {
  const getImage = (): JSX.Element => (
    <LoadableImage 
      className="profile-image" 
      source={props.image} 
    />
  )

  if(props.handleOnClick) {
    return (
      <button className="profile-image-button" type="button" onClick={props.handleOnClick}>
        {getImage()}
      </button>
    )
  }

  return getImage();
}