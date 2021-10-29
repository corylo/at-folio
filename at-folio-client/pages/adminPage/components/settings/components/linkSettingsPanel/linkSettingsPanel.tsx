import React, { useContext } from "react";

import { LinkManager } from "../../../../../../components/linkManager/linkManager";
import { SettingsPanel } from "../settingsPanel/settingsPanel"
import { SettingsSection } from "../settingsSection/settingsSection";

import { AppContext } from "../../../../../../components/app/appWrapper";

export const LinkSettingsPanel: React.FC = () => {
  const { appState } = useContext(AppContext);

  const { profile } = appState;

  return (
    <SettingsPanel icon="fa-regular fa-link" id="link-settings-panel" title="Links">
      <SettingsSection className="links-section">
        <LinkManager links={profile.links} />
      </SettingsSection>
    </SettingsPanel>
  )
}