import React, { createContext, useState } from "react";

import { App } from "./app";

import { IAppContext } from "../../models/appContext";
import { defaultAppState, IAppState, IAppTogglesUpdate } from "../../models/appState";

export const AppContext = createContext<IAppContext>(null);

export const AppWrapper: React.FC = () => {
  const [appState, setAppState] = useState<IAppState>(defaultAppState());

  const setAppToggles = (toggles: IAppTogglesUpdate): void => {
    setAppState({ 
      ...appState, 
      toggles: { 
        ...appState.toggles,
        ...toggles 
      }
    });
  }

  return (
    <AppContext.Provider value={{ appState, setAppState, setAppToggles }}>
      <App />
    </AppContext.Provider>
  )
}