import React, { useContext } from "react";

import { AddLinkForm } from "../../../addLinkForm/addLinkForm";
import { SettingsPanel } from "../settingsPanel/settingsPanel"
import { SettingsSection } from "../settingsSection/settingsSection";
import { UpdateLinkForm } from "../../../updateLinkForm/updateLinkForm";

import { AppContext } from "../../../../../../components/app/appWrapper";

import { ILink } from "../../../../../../../at-folio-models/link";

export const LinkPanel: React.FC = () => {
  const { profile } = useContext(AppContext);

  const getLinksSection = (): JSX.Element => {
    if(profile.links.length > 0) {
      const links: JSX.Element[] = profile.links.map((link: ILink) => (
        <UpdateLinkForm key={link.id} link={link} />
      ));

      return (       
        <SettingsSection className="links-section">
          {links}
        </SettingsSection>          
      );
    }
  }

  return (
    <SettingsPanel icon="fa-regular fa-link" id="link-panel" title="Links">
      <SettingsSection className="add-link-section">
        <AddLinkForm />
      </SettingsSection>
      {getLinksSection()}
    </SettingsPanel>
  )
}