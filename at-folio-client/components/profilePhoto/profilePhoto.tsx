import React from "react";

import { LoadableImage } from "../loadableImage/loadableImage";

import { IUnsplashPhotoReference } from "../../../at-folio-models/unsplashPhotoReference";

interface ProfilePhotoProps {
  photo: IUnsplashPhotoReference;
  handleOnClick?: () => void;
}

export const ProfilePhoto: React.FC<ProfilePhotoProps> = (props: ProfilePhotoProps) => {
  const { photo } = props;

  const getImage = (): JSX.Element => {
    if(photo.id !== "") {
      return (
        <LoadableImage 
          className="profile-photo" 
          source={props.photo.urls.thumb} 
        />
      )
    }

    return (
      <div className="profile-photo">
        <i className="fa-regular fa-user" />
      </div>
    )
  }

  if(props.handleOnClick) {
    return (
      <button className="profile-photo-button" type="button" onClick={props.handleOnClick}>
        {getImage()}
      </button>
    )
  }

  return getImage();
}