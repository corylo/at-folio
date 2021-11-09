import React, { useContext } from "react";

import { SettingsPanel } from "../settingsPanel/settingsPanel";
import { SettingsSection } from "../settingsSection/settingsSection";
import { UnsplashPhotoPicker } from "../../../../../../components/unsplashPhotoPicker/unsplashPhotoPicker";

import { AppContext } from "../../../../../../components/app/appWrapper";
import { SettingsContext } from "../../settingsWrapper";

import { ProfileService } from "../../../../../../services/profileService";

import { UnsplashUtility } from "../../../../../../../at-folio-utilities/unsplashUtility";

import { IUnsplashPhoto } from "../../../../../../../at-folio-models/unsplashPhoto";
import { IUnsplashPhotoReference } from "../../../../../../../at-folio-models/unsplashPhotoReference";

import { DefaultPhotoType } from "../../../../../../../at-folio-enums/defaultPhotoType";
import { SettingsPanelOption } from "../../enums/settingsPanelOption";

export const BackgroundPanel: React.FC = () => {
  const { profile, setProfileTo } = useContext(AppContext),
    { setOptionTo } = useContext(SettingsContext);

  const saveProfileBackground = async (selectedPhoto: IUnsplashPhoto): Promise<void> => {
    const background: IUnsplashPhotoReference = UnsplashUtility.mapPhotoReference(selectedPhoto);

    try {
      await ProfileService.update(profile.uid, { background });

      setProfileTo({ background });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <SettingsPanel 
      id="background-panel" 
      icon="fa-regular fa-image" 
      title="Profile / Background"
      handleOnBack={() => setOptionTo(SettingsPanelOption.Profile)}
    >
      <SettingsSection>
        <UnsplashPhotoPicker 
          type={DefaultPhotoType.Background}
          selectedPhotoID={profile.background.id} 
          handleOnClick={saveProfileBackground} 
        />
      </SettingsSection>
    </SettingsPanel>
  );
}