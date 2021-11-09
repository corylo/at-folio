import React, { useContext } from "react";

import { BackgroundPanel } from "./components/backgroundPanel/backgroundPanel";
import { LinkPanel } from "./components/linkPanel/linkPanel";
import { PhotoPanel } from "./components/photoPanel/photoPanel";
import { ProfilePanel } from "./components/profilePanel/profilePanel";
import { SettingsToolbar } from "./components/settingsToolbar/settingsToolbar";

import { SettingsContext } from "./settingsWrapper";

import { SettingsPanelOption } from "./enums/settingsPanelOption";

export const Settings: React.FC = () => {  
  const { option } = useContext(SettingsContext);

  const getSettingsPanel = (): JSX.Element => {
    switch(option) {
      case SettingsPanelOption.Profile:
        return <ProfilePanel />;
      case SettingsPanelOption.Photo:
        return <PhotoPanel />;
      case SettingsPanelOption.Background:
        return <BackgroundPanel />;
      case SettingsPanelOption.Links:
        return <LinkPanel />;
      default:
        return null;
    }
  }

  return (
    <React.Fragment>
      <SettingsToolbar />
      {getSettingsPanel()}
    </React.Fragment>
  );
}