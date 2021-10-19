import React, { createContext, useState } from "react";

import { App } from "./app";

import { IAppContext } from "../../models/appContext";
import { defaultAppState, IAppState } from "../../models/appState";

export const AppContext = createContext<IAppContext>(null);

export const AppWrapper: React.FC = () => {
  const [appState, setAppState] = useState<IAppState>(defaultAppState());

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      <App />
    </AppContext.Provider>
  )
}