import React, { useState } from "react";
import classNames from "classnames";

import { LoadableImage } from "../loadableImage/loadableImage";
import { LoadingIcon } from "../loading/loadingIcon";

import { ProfileUtility } from "../../utilities/profileUtility";

import { ImageSize } from "../../enums/imageSize";
import { ProfileImageOption } from "../../../at-folio-enums/profileImageOption";
import { RequestStatus } from "../../enums/requestStatus";

interface ImagePickerOptionProps {
  image: ProfileImageOption;
  selected: boolean;
  handleOnClick: (image: ProfileImageOption) => void;
}

export const ImagePickerOption: React.FC<ImagePickerOptionProps> = (props: ImagePickerOptionProps) => {
  const { image, selected } = props;

  const [status, setStatusTo] = useState<RequestStatus>(RequestStatus.Idle);

  const handleOnClick = async (): Promise<void> => {
    if(!props.selected && status !== RequestStatus.Loading) {
      try {
        setStatusTo(RequestStatus.Loading);

        await props.handleOnClick(image);
      } finally {
        setStatusTo(RequestStatus.Idle);    
      }
    }
  }

  const getLoadingIcon = (): JSX.Element => {
    if(status === RequestStatus.Loading) {
      return (
        <LoadingIcon wrapperClass />
      )
    }
  }

  return (
    <button 
      className={classNames("image-picker-option", { selected })} 
      type="button" 
      onClick={handleOnClick}
    >
      <LoadableImage 
        source={ProfileUtility.getImageUrl(image)} 
        size={ImageSize.Small} 
      />
      {getLoadingIcon()}
    </button>
  );
}