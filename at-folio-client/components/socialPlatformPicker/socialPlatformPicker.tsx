import React from "react";

import { SocialPlatformNetworkUtility } from "../../utilities/socialPlatformNetworkUtility";

import { SocialPlatform } from "../../../at-folio-enums/socialPlatform";

interface SocialPlatformPickerProps {
  selectedPlatform: SocialPlatform;
  handleOnChange: (platform: SocialPlatform) => void;
}

export const SocialPlatformPicker: React.FC<SocialPlatformPickerProps> = (props: SocialPlatformPickerProps) => {
  const getOptions = (): JSX.Element[] => {
    return SocialPlatformNetworkUtility.getPlatforms().map((platform: SocialPlatform) => (
      <option key={platform} value={platform}>{platform}</option>
    ));
  }

  const getSelectedOption = (): JSX.Element => {
    if(props.selectedPlatform !== SocialPlatform.None) {
      const styles: React.CSSProperties = {
        backgroundImage: `url(${SocialPlatformNetworkUtility.getPlatformImageUrl(props.selectedPlatform)})`
      };

      return (
        <div className="social-platform-picker-selected-option" style={styles} />
      )
    }
  }

  return (
    <div className="social-platform-picker">
      {getSelectedOption()}
      <select value={props.selectedPlatform} onChange={(e: any) => props.handleOnChange(e.target.value)}>
        <option value={SocialPlatform.None}>Select a platform</option>
        {getOptions()}
      </select>
    </div>
  );
}