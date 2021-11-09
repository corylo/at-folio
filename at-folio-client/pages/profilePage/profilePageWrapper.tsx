import React, { createContext, useState } from "react";

import { ProfilePage } from "./profilePage";

import { IProfilePageContext } from "./models/profilePageContext";
import { defaultProfilePageState, IProfilePageState } from "./models/profilePageState";

export const ProfilePageContext = createContext<IProfilePageContext>(null);

export const ProfilePageWrapper: React.FC = () => {  
  const [state, setStateTo] = useState<IProfilePageState>(defaultProfilePageState());

  return (
    <ProfilePageContext.Provider value={{ state, setStateTo }}>
      <ProfilePage />
    </ProfilePageContext.Provider>
  )
}