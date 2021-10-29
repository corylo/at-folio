import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { LoadableImage } from "../loadableImage/loadableImage";
import { LoadingIcon } from "../loading/loadingIcon";

import { ProfileUtility } from "../../utilities/profileUtility";

import { ImageSize } from "../../enums/imageSize";
import { ProfileImageOption } from "../../../at-folio-enums/profileImageOption";
import { RequestStatus } from "../../enums/requestStatus";
import { StatusMessage } from "../statusMessage/statusMessage";

interface ImagePickerOptionProps {
  image: ProfileImageOption;
  selected: boolean;
  handleOnClick?: (image: ProfileImageOption) => void;
  handleOnClickAsync?: (image: ProfileImageOption) => Promise<void>;
}

export const ImagePickerOption: React.FC<ImagePickerOptionProps> = (props: ImagePickerOptionProps) => {
  const { image, selected } = props;

  const [status, setStatusTo] = useState<RequestStatus>(RequestStatus.Idle);

  useEffect(() => {
    if(status === RequestStatus.Success) {
      const timeout: NodeJS.Timeout = setTimeout(() => {
        setStatusTo(RequestStatus.Idle);
      }, 2000);

      if(!selected) {
        setStatusTo(RequestStatus.Idle);
      }

      return () => {
        clearTimeout(timeout);
      }
    }
  }, [status, selected]);

  const handleOnClick = async (): Promise<void> => {
    if(props.handleOnClickAsync) {
      if(!props.selected && status !== RequestStatus.Loading) {
        try {
          setStatusTo(RequestStatus.Loading);

          await props.handleOnClickAsync(image);

          setStatusTo(RequestStatus.Success);
        } catch(err) {}
      }
    } else if (props.handleOnClick) {
      props.handleOnClick(image);
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
      <StatusMessage 
        activeStatuses={[RequestStatus.Success]} 
        icon
        status={status} 
        text="Saved"
        wrapperClass
      />
    </button>
  );
}