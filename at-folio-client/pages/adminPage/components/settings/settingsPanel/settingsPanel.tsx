import React, { useContext, useState } from "react";

import { ImagePicker } from "../../../../../components/imagePicker/imagePicker";
import { IconButton } from "../../../../../components/button/iconButton/iconButton";
import { Input } from "../../../../../components/input/input";
import { LinkManager } from "../../../../../components/linkManager/linkManager";
import { SettingsSection } from "../settingsSection/settingsSection";

import { AppContext } from "../../../../../components/app/appWrapper";

import { ProfileImageOption } from "../../../../../../at-folio-enums/profileImageOption";
import { ProfileService } from "../../../../../services/profileService";

export const SettingsPanel: React.FC = () => {
  const { appState, setProfileTo } = useContext(AppContext);

  const { profile } = appState;

  const [toggled, setToggledTo] = useState<boolean>(false);

  if(toggled) {
    const saveProfileImage = async (image: ProfileImageOption): Promise<void> => {
      try {
        await ProfileService.update(profile.username, { image });

        setProfileTo({ ...profile, image });
      } catch (err) {
        console.error(err);
      }
    }

    const saveProfileBackground = async (background: ProfileImageOption): Promise<void> => {
      try {
        await ProfileService.update(profile.username, { background });

        setProfileTo({ ...profile, background });
      } catch (err) {
        console.error(err);
      }
    }

    return (
      <div id="settings-panel-wrapper">
        <div id="settings-panel" className="scroll-bar light">
          <div id="settings-panel-header">
            <h1 id="settings-panel-title" className="rubik-font">My Profile</h1>          
            <IconButton 
              className="close-button"
              icon="fa-regular fa-xmark" 
              handleOnClick={() => setToggledTo(false)} 
            />
          </div>
          <div id="settings-panel-sections">
            <SettingsSection className="url-section" label="Url">
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
            <SettingsSection label="Profile Image">
              <ImagePicker 
                selectedImage={profile.image}
                handleOnClick={saveProfileImage} 
              />
            </SettingsSection>
            <SettingsSection label="Profile Background">
              <ImagePicker 
                selectedImage={profile.background}
                handleOnClick={saveProfileBackground} 
              />
            </SettingsSection>
            <SettingsSection className="links-section" label="Links">
              <LinkManager links={profile.links} />
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