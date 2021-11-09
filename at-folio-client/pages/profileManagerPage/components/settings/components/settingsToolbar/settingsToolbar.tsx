import React, { useContext } from "react";

import { IconButton } from "../../../../../../components/button/iconButton/iconButton";
import { SettingsToolbarOption } from "./settingsToolbarOption";

import { ProfileManagerPageContext } from "../../../../profileManagerPageWrapper";

import { SettingsPanelOption } from "../../enums/settingsPanelOption";

export const SettingsToolbar: React.FC = () => {  
  const { state, setStateTo } = useContext(ProfileManagerPageContext);

  const getTutorialToggle = (): JSX.Element => {
    if(!state.tutorialToggled) {
      return (
        <IconButton          
          icon="fa-regular fa-circle-info"
          id="settings-toolbar-tutorial-toggle"
          handleOnClick={() => setStateTo({ ...state, tutorialToggled: true })}
        />
      )
    }
  }

  return (
    <div id="settings-toolbar-outer-wrapper">   
      <div id="settings-toolbar-inner-wrapper">   
        <div id="settings-toolbar">   
          <SettingsToolbarOption
            icon="fa-regular fa-user"
            id="settings-toolbar-profile-option"
            option={SettingsPanelOption.Profile}
            suboptions={[SettingsPanelOption.Photo, SettingsPanelOption.Background]}
          />
          <SettingsToolbarOption
            icon="fa-regular fa-link"
            id="settings-toolbar-links-option"
            option={SettingsPanelOption.Links}
          />
        </div>
        {getTutorialToggle()}
      </div>
    </div>
  );
}