import React from "react";

import { LoadableImage } from "../loadableImage/loadableImage";

interface ProfileImageProps {
  image: string;
  handleOnClick?: () => void;
}

export const ProfileImage: React.FC<ProfileImageProps> = (props: ProfileImageProps) => {
  const getImage = (): JSX.Element => {
    if(props.image !== "") {
      return (
        <LoadableImage 
          className="profile-image" 
          source={props.image} 
        />
      )
    }

    return (
      <div className="profile-image">
        <i className="fa-regular fa-user" />
      </div>
    )
  }

  if(props.handleOnClick) {
    return (
      <button className="profile-image-button" type="button" onClick={props.handleOnClick}>
        {getImage()}
      </button>
    )
  }

  return getImage();
}