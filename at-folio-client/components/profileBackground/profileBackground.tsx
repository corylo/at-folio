import React from "react";

import { IUnsplashPhotoReference } from "../../../at-folio-models/unsplashPhotoReference";

interface ProfileBackgroundProps {
  photo: IUnsplashPhotoReference;
}

export const ProfileBackground: React.FC<ProfileBackgroundProps> = (props: ProfileBackgroundProps) => {  
  return (
    <div className="profile-background" style={{ backgroundImage: `url(${props.photo.urls.regular})` }} />
  );
}