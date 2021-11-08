import React from "react";

import { LoadableImage } from "../loadableImage/loadableImage";

import { IUnsplashPhotoReference } from "../../../at-folio-models/unsplashPhotoReference";

interface ProfileBackgroundProps {
  photo: IUnsplashPhotoReference;
}

export const ProfileBackground: React.FC<ProfileBackgroundProps> = (props: ProfileBackgroundProps) => {  
  return (
    <LoadableImage
      className="profile-background"
      previewSource={props.photo.urls.thumb}
      showLoadingIcon
      source={props.photo.urls.regular}
    />
  );
}