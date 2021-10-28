import React from "react";
import classNames from "classnames";

import { LoadableImage } from "../loadableImage/loadableImage";

import { ProfileUtility } from "../../utilities/profileUtility";

import { ImageSize } from "../../enums/imageSize";
import { ProfileImageOption } from "../../../at-folio-enums/profileImageOption";

interface BackgroundPickerProps {
  selectedBackground: ProfileImageOption;
  handleOnClick: (background: ProfileImageOption) => void;
}

export const BackgroundPicker: React.FC<BackgroundPickerProps> = (props: BackgroundPickerProps) => {
  const getOptions = (): JSX.Element[] => {
    return ProfileUtility.getImages().map((background: ProfileImageOption) => {
      const selected: boolean = background === props.selectedBackground;

      return (
        <button 
          key={background} 
          className={classNames("background-picker-option", { selected })} 
          type="button" 
          onClick={() => props.handleOnClick(background)}
        >
          <LoadableImage 
            source={ProfileUtility.getImageUrl(background)} 
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