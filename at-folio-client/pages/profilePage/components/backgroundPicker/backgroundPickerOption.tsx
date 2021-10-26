import React from "react";
import classNames from "classnames";

import { LoadableImage } from "../../../../components/loadableImage/loadableImage";

import { ProfileUtility } from "../../../../utilities/profileUtility";

import { ImageSize } from "../../../../enums/imageSize";
import { ProfileBackgroundImage } from "../../../../../at-folio-enums/profileBackgroundImage";

interface BackgroundPickerOptionProps {
  activeBackground?: ProfileBackgroundImage;
  background: ProfileBackgroundImage;
  handleOnClick: () => void;
}

export const BackgroundPickerOption: React.FC<BackgroundPickerOptionProps> = (props: BackgroundPickerOptionProps) => {
  const classes: string = classNames("background-picker-option", { active: props.activeBackground === props.background });

  return (
    <button className={classes} type="button" onClick={props.handleOnClick}>
      <LoadableImage source={ProfileUtility.getBackgroundImageUrl(props.background)} size={ImageSize.Small} />
    </button>
  );
}