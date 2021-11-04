import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Input } from "../../../../../../components/input/input";
import { PhotoPickerToggle } from "../../../../../../components/photoPickerToggle/photoPickerToggle";
import { SettingsPanel } from "../settingsPanel/settingsPanel";
import { SettingsSection } from "../settingsSection/settingsSection";

import { AppContext } from "../../../../../../components/app/appWrapper";
import { SettingsContext } from "../../settingsWrapper";

import { SettingsPanelOption } from "../../enums/settingsPanelOption";

export const ProfilePanel: React.FC = () => {
  const { profile } = useContext(AppContext),
    { setOptionTo } = useContext(SettingsContext);

  const [copied, setCopiedTo] = useState<boolean>(false);

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      setCopiedTo(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    }
  }, [copied]);

  const url: string = `https://atfol.io/${profile.username}`;

  const handleOnCopy = async (): Promise<void> => {
    if(navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url)

        setCopiedTo(true);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <SettingsPanel id="profile-panel" icon="fa-regular fa-user" title="Profile">
      <SettingsSection className="url-section" label="Url">
        <Input>
          <input 
            disabled
            type="text" 
            placeholder="Enter username" 
            value={url}
            onChange={() => {}}
          />
        </Input>          
        <div className="url-section-actions">
          <button
            type="button"
            className="url-section-action button rubik-font"
            onClick={handleOnCopy}
          >
            { copied ? "Copied" : "Copy" }
          </button>
          <Link
            to={`/${profile.username}`}
            className="url-section-action link rubik-font"
          >
            View
          </Link>
        </div>
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