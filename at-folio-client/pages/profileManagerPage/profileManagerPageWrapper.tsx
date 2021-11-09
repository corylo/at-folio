import React, { createContext, useState } from "react";

import { ProfileManagerPage } from "./profileManagerPage";

import { IProfileManagerPageContext } from "./models/profileManagerPageContext";
import { defaultProfileManagerPageState, IProfileManagerPageState } from "./models/profileManagerPageState";

export const ProfileManagerPageContext = createContext<IProfileManagerPageContext>(null);

export const ProfileManagerPageWrapper: React.FC = () => {  
  const [state, setStateTo] = useState<IProfileManagerPageState>(defaultProfileManagerPageState());

  return (
    <ProfileManagerPageContext.Provider value={{ state, setStateTo }}>
      <ProfileManagerPage />
    </ProfileManagerPageContext.Provider>
  )
}