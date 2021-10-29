import React, { useContext } from "react";

import { AddLinkForm } from "../../../addLinkForm/addLinkForm";
import { LinkItem } from "../../../linkItem/linkItem";
import { SettingsPanel } from "../settingsPanel/settingsPanel"
import { SettingsSection } from "../settingsSection/settingsSection";

import { AppContext } from "../../../../../../components/app/appWrapper";

import { ILink } from "../../../../../../../at-folio-models/link";

export const LinkSettingsPanel: React.FC = () => {
  const { appState } = useContext(AppContext);

  const { profile } = appState;

  const getLinksSection = (): JSX.Element => {
    if(profile.links.length > 0) {
      const links: JSX.Element[] = profile.links.map((link: ILink) => (
        <LinkItem key={link.id} platform={link.platform} url={link.url} />
      ));

      return (       
        <SettingsSection className="links-section">
          {links}
        </SettingsSection>          
      );
    }
  }

  return (
    <SettingsPanel icon="fa-regular fa-link" id="link-settings-panel" title="Links">
      <SettingsSection className="add-link-section">
        <AddLinkForm />
      </SettingsSection>
      {getLinksSection()}
    </SettingsPanel>
  )
}