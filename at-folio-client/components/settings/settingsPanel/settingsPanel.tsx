import React, { useContext, useState } from "react";

import { BackgroundPicker } from "../../backgroundPicker/backgroundPicker";
import { IconButton } from "../../button/iconButton/iconButton";
import { Input } from "../../input/input";
import { SettingsSection } from "../settingsSection/settingsSection";

import { AppContext } from "../../app/appWrapper";

import { ProfileBackgroundImage } from "../../../../at-folio-enums/profileBackgroundImage";

export const SettingsPanel: React.FC = () => {
  const { appState, setProfileTo } = useContext(AppContext);

  const { profile } = appState;

  const [toggled, setToggledTo] = useState<boolean>(false);

  if(toggled) {
    return (
      <div id="settings-panel-wrapper">
        <div id="settings-panel" className="scroll-bar light">
          <div id="settings-panel-header">
            <h1 id="settings-panel-title" className="rubik-font">Profile Settings</h1>          
            <IconButton 
              className="close-button"
              icon="fa-regular fa-xmark" 
              handleOnClick={() => setToggledTo(false)} 
            />
          </div>
          <div id="settings-panel-sections">
            <SettingsSection className="my-link-section" label="My Link">
              <Input>
                <input 
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
                  type="text" 
                  placeholder="Enter username" 
                  value={profile.username}
                  onChange={(e: any) => {}}
                />
              </Input>          
            </SettingsSection>
            <SettingsSection label="Background">
              <BackgroundPicker 
                selectedBackground={profile.background}
                handleOnClick={(background: ProfileBackgroundImage) => setProfileTo({ ...profile, background })} 
              />
            </SettingsSection>
          </div>
        </div>
      </div>
    );
  }

  return (     
    <IconButton 
      id="toggle-settings-panel-button"
      icon="fa-regular fa-gear" 
      handleOnClick={() => setToggledTo(true)} 
    />
  )
}