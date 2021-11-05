import React, { createContext, useState } from "react";

import { App } from "./app";

import { IAppContext } from "../../models/appContext";
import { defaultAppState, IAppState, IAppTogglesUpdate } from "../../models/appState";
import { IProfileAdminUpdate } from "../../../at-folio-models/profileAdmin";
import { IProfileUpdate } from "../../../at-folio-models/profile";

export const AppContext = createContext<IAppContext>(null);

export const AppWrapper: React.FC = () => {
  const [appState, setAppStateTo] = useState<IAppState>(defaultAppState());

  const setAppTogglesTo = (toggles: IAppTogglesUpdate): void => {
    setAppStateTo({ 
      ...appState, 
      toggles: { 
        ...appState.toggles,
        ...toggles 
      }
    });
  }

  const setProfileTo = (profile: IProfileUpdate): void => {
    setAppStateTo({ 
      ...appState, 
      profile: { 
        ...appState.profile,
        ...profile
      }
    });
  }

  const setProfileAdminTo = (admin: IProfileAdminUpdate): void => {
    setAppStateTo({ 
      ...appState, 
      profile: { 
        ...appState.profile,
        admin: {
          ...appState.profile.admin,
          ...admin
        }
      }
    });
  }

  const value: IAppContext = { 
    appState, 
    platforms: appState.platforms,
    profile: appState.profile,
    user: appState.user,
    userStatus: appState.userStatus,
    setAppStateTo, 
    setAppTogglesTo,
    setProfileAdminTo,
    setProfileTo
  };

  return (
    <AppContext.Provider value={value}>
      <App />
    </AppContext.Provider>
  )
}