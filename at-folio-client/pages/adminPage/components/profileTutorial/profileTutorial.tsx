import React, { useContext } from "react";

import { ProfileTutorialComponent } from "./profileTutorialComponent";

import { AdminPageContext } from "../../adminPageWrapper";

export const ProfileTutorial: React.FC = () => {  
  const { state } = useContext(AdminPageContext);
  
  if(state.tutorialToggled) {
    return (
      <ProfileTutorialComponent />
    )
  }

  return null;
}