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

  const getUnsplashStatement = (): JSX.Element => {
    const creator: JSX.Element = (
      <a 
        className="creator-link" 
        href={`${photo.creator.link}?utm_source=@folio&utm_medium=referral`} 
        target="_blank"
        title={photo.creator.name}
      >
        {photo.creator.name} 
      </a>
    );

    const unsplash: JSX.Element = (
      <a 
        className="unsplash-link" 
        href={`https://unsplash.com/?utm_source=@folio&utm_medium=referral`} 
        target="_blank"
        title="Unsplash"
      >
        <i className="fa-brands fa-unsplash" />
      </a>
    );

    return (
      <div className="unsplash-photo-creator">
        <h1 className="rubik-font">{creator}{unsplash}</h1>
      </div>
    )
  }

  return (
    <div className={classNames("unsplash-photo-picker-option", { selected })}>
      <button 
        className="unsplash-photo-picker-option-button"
        type="button" 
        onClick={handleOnClick}
      >
        <div className="unsplash-photo" style={{ backgroundImage: `url(${photo.urls.thumb})` }} />
      </button>
      {getUnsplashStatement()}
      {getLoadingIcon()}
      <StatusMessage
        activeStatuses={[RequestStatus.Success]} 
        icon
        status={status} 
        text="Saved"
        wrapperClass
      />
    </div>
  );
}