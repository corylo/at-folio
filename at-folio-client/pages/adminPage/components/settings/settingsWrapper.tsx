import React, { createContext, useState } from "react";

import { Settings } from "./settings";

import { ISettingsContext } from "./models/settingsContext";

import { SettingsPanelOption } from "./enums/settingsPanelOption";

export const SettingsContext = createContext<ISettingsContext>(null);

export const SettingsWrapper: React.FC = () => {
  const [option, setOptionTo] = useState<SettingsPanelOption>(SettingsPanelOption.None);

  const value: ISettingsContext = { 
    option, 
    setOptionTo
  };

  return (
    <SettingsContext.Provider value={value}>
      <Settings />
    </SettingsContext.Provider>
  )
}