import React from "react";

import { SettingsToolbarOption } from "./settingsToolbarOption";

import { SettingsPanelOption } from "../../enums/settingsPanelOption";

export const SettingsToolbar: React.FC = () => {  
  return (
    <div id="settings-toolbar-outer-wrapper">   
      <div id="settings-toolbar-inner-wrapper">   
        <div id="settings-toolbar">   
          <SettingsToolbarOption
            icon="fa-regular fa-user"
            option={SettingsPanelOption.Profile}
          />
          <SettingsToolbarOption
            icon="fa-regular fa-link"
            option={SettingsPanelOption.Links}
          />
        </div>
      </div>
    </div>
  );
}