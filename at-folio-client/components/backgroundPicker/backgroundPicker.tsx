import React from "react";
import classNames from "classnames";

import { LoadableImage } from "../loadableImage/loadableImage";

import { ProfileUtility } from "../../utilities/profileUtility";

import { ImageSize } from "../../enums/imageSize";
import { ProfileBackgroundImage } from "../../../at-folio-enums/profileBackgroundImage";

interface BackgroundPickerProps {
  selectedBackground: ProfileBackgroundImage;
  handleOnClick: (background: ProfileBackgroundImage) => void;
}

export const BackgroundPicker: React.FC<BackgroundPickerProps> = (props: BackgroundPickerProps) => {
  const getOptions = (): JSX.Element[] => {
    return ProfileUtility.getBackgroundImages().map((background: ProfileBackgroundImage) => {
      const selected: boolean = background === props.selectedBackground;

      return (
        <button 
          key={background} 
          className={classNames("background-picker-option", { selected })} 
          type="button" 
          onClick={() => props.handleOnClick(background)}
        >
          <LoadableImage 
            source={ProfileUtility.getBackgroundImageUrl(background)} 
            size={ImageSize.Small} 
          />
        </button>
      )
    });
  }

  return (
    <div id="background-picker">      
      {getOptions()}
    </div>
  );
}