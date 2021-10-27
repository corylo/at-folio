import React from "react";
import classNames from "classnames";

interface SettingsSectionProps {
  children: any;
  className?: string;
  label?: string;
}

export const SettingsSection: React.FC<SettingsSectionProps> = (props: SettingsSectionProps) => {
  const getLabel = (): JSX.Element => {
    if(props.label) {
      return (        
        <h1 className="settings-section-label rubik-font">{props.label}</h1>
      )
    }
  }

  return (
    <div className={classNames("settings-section", props.className)}>
      {getLabel()}
      <div className="settings-section-content">
        {props.children}
      </div>
    </div>
  );
}