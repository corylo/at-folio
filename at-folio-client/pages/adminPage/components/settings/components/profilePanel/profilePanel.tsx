import React, { useContext } from "react";

import { Input } from "../../../../../../components/input/input";
import { PhotoPickerToggle } from "../../../../../../components/photoPickerToggle/photoPickerToggle";
import { SettingsPanel } from "../settingsPanel/settingsPanel";
import { SettingsSection } from "../settingsSection/settingsSection";

import { AppContext } from "../../../../../../components/app/appWrapper";
import { SettingsContext } from "../../settingsWrapper";

import { SettingsPanelOption } from "../../enums/settingsPanelOption";

export const ProfilePanel: React.FC = () => {
  const { appState } = useContext(AppContext),
    { setOptionTo } = useContext(SettingsContext);

  const { profile } = appState;

  return (
    <SettingsPanel id="profile-panel" icon="fa-regular fa-user" title="Profile">
      <SettingsSection className="url-section" label="Url">
        <Input>
          <input 
            disabled
            type="text" 
            placeholder="Enter username" 
            value={`https://atfol.io/${profile.username}`}
            onChange={() => {}}
          />
        </Input>          
      </SettingsSection>
      <SettingsSection className="username-section" label="Username">
        <Input>
          <input 
            disabled
            type="text" 
            placeholder="Enter username" 
            value={profile.username}
            onChange={() => {}}
          />
        </Input>          
      </SettingsSection>
      <SettingsSection className="photos-section" label="Photos">
        <PhotoPickerToggle
          label="Profile" 
          selectedPhoto={profile.photo} 
          handleOnToggle={() => setOptionTo(SettingsPanelOption.Photo)} 
        />
        <PhotoPickerToggle 
          label="Background"
          selectedPhoto={profile.background} 
          handleOnToggle={() => setOptionTo(SettingsPanelOption.Background)} 
        />        
      </SettingsSection>
    </SettingsPanel>
  );
}