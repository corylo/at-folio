import React, { useState } from "react";
import classNames from "classnames";

import { BackgroundPickerOption } from "./backgroundPickerOption";
import { WrappableComponent } from "../../../../components/wrappableComponent/wrappableComponent";

import { ProfileUtility } from "../../../../utilities/profileUtility";

import { ProfileBackgroundImage } from "../../../../../at-folio-enums/profileBackgroundImage";

interface BackgroundPickerProps {
  activeBackground: ProfileBackgroundImage;
  wrapperID?: string;
  setBackgroundTo: (background: ProfileBackgroundImage) => void;
}

export const BackgroundPicker: React.FC<BackgroundPickerProps> = (props: BackgroundPickerProps) => {
  const [selecting, setSelectingTo] = useState<boolean>(false);

  const handleOnClick = (background: ProfileBackgroundImage): void => {
    props.setBackgroundTo(background);

    setSelectingTo(false);
  }

  const getOptions = (): JSX.Element[] => {
    return ProfileUtility.getBackgroundImages().map((background: ProfileBackgroundImage) => {      
      return (
        <BackgroundPickerOption 
          key={background}
          background={background} 
          activeBackground={props.activeBackground} 
          handleOnClick={() => handleOnClick(background)}
        />
      )
    })
  }

  return (
    <WrappableComponent wrapperID={props.wrapperID}>
      <div className={classNames("background-picker", { selecting })}>
        <div className="background-picker-active-option">
          <BackgroundPickerOption 
            background={props.activeBackground} 
            handleOnClick={() => setSelectingTo(true)} 
          />
        </div>
        <div className="background-picker-options">
          {getOptions()}
        </div>
      </div>
    </WrappableComponent>
  );
}