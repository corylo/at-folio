import React, { useContext } from "react";

import { LinkSettingsPanel } from "./components/linkSettingsPanel/linkSettingsPanel";
import { ProfileSettingsPanel } from "./components/profileSettingsPanel/profileSettingsPanel";
import { SettingsToolbar } from "./components/settingsToolbar/settingsToolbar";

import { SettingsContext } from "./settingsWrapper";

import { SettingsPanelOption } from "./enums/settingsPanelOption";

export const Settings: React.FC = () => {  
  const { option } = useContext(SettingsContext);

  const getSettingsPanel = (): JSX.Element => {
    if(option === SettingsPanelOption.Profile) {
      return (
        <ProfileSettingsPanel />
      )
    } else if (option === SettingsPanelOption.Links) {
      return (
        <LinkSettingsPanel />
      )
    }
  }

  return (
    <React.Fragment>
      <SettingsToolbar />
      {getSettingsPanel()}
    </React.Fragment>
  );
}