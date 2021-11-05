import React, { useContext } from "react";

import { AppContext } from "../app/appWrapper";

import { SocialPlatformUtility } from "../../utilities/socialPlatformUtility";

import { ISocialPlatform } from "../../../at-folio-models/socialPlatform";

interface SocialPlatformPickerProps {
  disabled?: boolean;
  selectedPlatform: string;
  handleOnChange: (platform: string) => void;
}

export const SocialPlatformPicker: React.FC<SocialPlatformPickerProps> = (props: SocialPlatformPickerProps) => {
  const { platforms } = useContext(AppContext);

  const getOptions = (): JSX.Element[] => {
    return platforms.map((platform: ISocialPlatform) => (
      <option key={platform.name} value={platform.name}>{platform.name}</option>
    ));
  }

  const getSelectedOption = (): JSX.Element => {
    if(props.selectedPlatform !== "") {
      const styles: React.CSSProperties = {
        backgroundImage: `url(${SocialPlatformUtility.getPlatformImageUrl(props.selectedPlatform)})`
      };

      return (
        <div className="social-platform-picker-selected-option" style={styles} />
      )
    }
  }

  return (
    <div className="social-platform-picker">
      {getSelectedOption()}
      <select value={props.selectedPlatform} disabled={props.disabled || false} onChange={(e: any) => props.handleOnChange(e.target.value)}>
        <option value="">Select a platform</option>
        {getOptions()}
      </select>
    </div>
  );
}