import React, { useContext } from "react";

import { ProfileTutorialComponent } from "./profileTutorialComponent";

import { ProfileManagerPageContext } from "../../profileManagerPageWrapper";

export const ProfileTutorial: React.FC = () => {  
  const { state } = useContext(ProfileManagerPageContext);
  
  if(state.tutorialToggled) {
    return (
      <ProfileTutorialComponent />
    )
  }

  return null;
}