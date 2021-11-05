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

export const PhotoPanel: React.FC = () => {
  const { profile, setProfileTo } = useContext(AppContext),
    { setOptionTo } = useContext(SettingsContext);

  const saveProfileImage = async (selectedPhoto: IUnsplashPhoto): Promise<void> => {
    const photo: IUnsplashPhotoReference = UnsplashUtility.mapPhotoReference(selectedPhoto);

    try {
      await ProfileService.update(profile.uid, { photo });

      setProfileTo({ photo });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <SettingsPanel 
      id="photo-panel" 
      icon="fa-regular fa-image" 
      title="Profile / Photo"
      handleOnBack={() => setOptionTo(SettingsPanelOption.Profile)}
    >
      <SettingsSection>
        <UnsplashPhotoPicker 
          type={DefaultPhotoType.Profile}
          selectedPhotoID={profile.photo.id} 
          handleOnClick={saveProfileImage} 
        />
      </SettingsSection>
    </SettingsPanel>
  );
}