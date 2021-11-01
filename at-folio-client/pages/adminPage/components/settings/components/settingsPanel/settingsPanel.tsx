import React, { useContext } from "react";

import { IconButton } from "../../../../../../components/button/iconButton/iconButton";
import { SettingsSection } from "../settingsSection/settingsSection";

import { SettingsContext } from "../../settingsWrapper";

import { SettingsPanelOption } from "../../enums/settingsPanelOption";

interface SettingsPanelProps {
  children: any;
  icon: string;
  id?: string;
  title: string;
  handleOnBack?: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = (props: SettingsPanelProps) => {
  const { setOptionTo } = useContext(SettingsContext);

  const getBackButton = (): JSX.Element => {
    if(props.handleOnBack) {
      return (
        <SettingsSection className="back-button-section">
          <IconButton 
            className="settings-panel-back-button"
            icon="fa-regular fa-arrow-left" 
            handleOnClick={props.handleOnBack} 
          />
        </SettingsSection>
      )
    }
  }

  return (
    <div id={props.id} className="settings-panel-wrapper">
      <div className="settings-panel">
        <div className="settings-panel-header">
          <div className="settings-panel-title">
            <i className={props.icon} />
            <h1 className="rubik-font">{props.title}</h1>          
          </div>
          <IconButton 
            className="close-button"
            icon="fa-regular fa-xmark" 
            handleOnClick={() => setOptionTo(SettingsPanelOption.None)} 
          />
        </div>
        <div className="settings-panel-sections-wrapper">
          <div className="settings-panel-sections scroll-bar light">
            {getBackButton()}
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}