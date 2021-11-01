import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { StatusMessage } from "../statusMessage/statusMessage";

import { IUnsplashPhoto } from "../../../at-folio-models/unsplashPhoto";

import { RequestStatus } from "../../enums/requestStatus";
import { LoadingIcon } from "../loading/loadingIcon";

interface UnsplashPhotoPickerOptionProps {  
  photo: IUnsplashPhoto;
  selected: boolean;
  handleOnClick: (photo: IUnsplashPhoto) => Promise<void> | void;
}

export const UnsplashPhotoPickerOption: React.FC<UnsplashPhotoPickerOptionProps> = (props: UnsplashPhotoPickerOptionProps) => {
  const { photo, selected } = props;

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
    if(!props.selected && status !== RequestStatus.Loading) {
      try {
        setStatusTo(RequestStatus.Loading);

        await props.handleOnClick(photo);

        setStatusTo(RequestStatus.Success);
      } catch(err) {}
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
      className={classNames("unsplash-photo-picker-option", { selected })} 
      type="button" 
      onClick={handleOnClick}
    >
      <div className="unsplash-photo" style={{ backgroundImage: `url(${photo.urls.thumb})` }} />
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