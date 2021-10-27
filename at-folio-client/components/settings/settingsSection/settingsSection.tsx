import React from "react";

interface SettingsSectionProps {
  children: any;
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
    <div className="settings-section">
      {getLabel()}
      <div className="settings-section-contents">
        {props.children}
      </div>
    </div>
  );
}