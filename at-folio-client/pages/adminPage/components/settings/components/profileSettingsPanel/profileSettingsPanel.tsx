import React, { useContext } from "react";

import { ImagePicker } from "../../../../../../components/imagePicker/imagePicker";
import { Input } from "../../../../../../components/input/input";
import { SettingsPanel } from "../settingsPanel/settingsPanel";
import { SettingsSection } from "../settingsSection/settingsSection";

import { AppContext } from "../../../../../../components/app/appWrapper";

import { ProfileService } from "../../../../../../services/profileService";

import { ProfileImageOption } from "../../../../../../../at-folio-enums/profileImageOption";

export const ProfileSettingsPanel: React.FC = () => {
  const { appState, setProfileTo } = useContext(AppContext);

  const { profile } = appState;

  const saveProfileImage = async (image: ProfileImageOption): Promise<void> => {
    try {
      await ProfileService.update(profile.uid, { image });

      setProfileTo({ ...profile, image });
    } catch (err) {
      console.error(err);
    }
  }

  const saveProfileBackground = async (background: ProfileImageOption): Promise<void> => {
    try {
      await ProfileService.update(profile.uid, { background });

      setProfileTo({ ...profile, background });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <SettingsPanel icon="fa-regular fa-user" title="Profile">
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
            onChange={() => {}}
          />
        </Input>          
      </SettingsSection>
      <SettingsSection label="Profile Image">
        <ImagePicker 
          selectedImage={profile.image}
          handleOnClickAsync={saveProfileImage} 
        />
      </SettingsSection>
      <SettingsSection label="Profile Background">
        <ImagePicker 
          selectedImage={profile.background}
          handleOnClickAsync={saveProfileBackground} 
        />
      </SettingsSection>
    </SettingsPanel>
  );
}