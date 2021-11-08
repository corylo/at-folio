import React from "react";

import { IUnsplashPhotoReference } from "../../../at-folio-models/unsplashPhotoReference";
import { LoadableImage } from "../loadableImage/loadableImage";

interface ProfileBackgroundProps {
  photo: IUnsplashPhotoReference;
}

export const ProfileBackground: React.FC<ProfileBackgroundProps> = (props: ProfileBackgroundProps) => {  
  return (
    <LoadableImage
      className="profile-background"
      previewSource={props.photo.urls.thumb}
      source={props.photo.urls.full}
    />
  );
}