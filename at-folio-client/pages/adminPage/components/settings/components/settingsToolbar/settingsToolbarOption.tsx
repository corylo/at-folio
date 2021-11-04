import React, { useContext } from "react";
import classNames from "classnames";

import { IconButton } from "../../../../../../components/button/iconButton/iconButton";

import { SettingsContext } from "../../settingsWrapper";

import { SettingsPanelOption } from "../../enums/settingsPanelOption";

interface SettingsToolbarOptionProps {
  icon: string;
  id: string;
  option: SettingsPanelOption;
  suboptions?: SettingsPanelOption[];
}

export const SettingsToolbarOption: React.FC<SettingsToolbarOptionProps> = (props: SettingsToolbarOptionProps) => {  
  const { option, setOptionTo } = useContext(SettingsContext);

  const selected: boolean = props.option === option || (props.suboptions && props.suboptions.includes(option));

  const handleOnClick = (): void => {    
    setOptionTo(selected ? SettingsPanelOption.None : props.option);
  }

  return (  
    <IconButton 
      className={classNames("settings-toolbar-option", { selected })}
      icon={props.icon}
      id={props.id}
      handleOnClick={handleOnClick} 
    />
  );
}