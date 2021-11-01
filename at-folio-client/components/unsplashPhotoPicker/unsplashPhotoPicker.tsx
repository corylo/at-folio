import React, { useEffect, useState } from "react";

import { LoadingIcon } from "../loading/loadingIcon";
import { UnsplashPhotoPickerOption } from "./unsplashPhotoPickerOption";

import { DefaultPhotoService } from "../../services/defaultPhotoService";

import { IUnsplashPhoto } from "../../../at-folio-models/unsplashPhoto";
import { defaultUnsplashPhotoPickerState, IUnsplashPhotoPickerState } from "./models/unsplashPhotoPickerState";

import { DefaultPhotoType } from "../../../at-folio-enums/defaultPhotoType";
import { RequestStatus } from "../../enums/requestStatus";

interface UnsplashPhotoPickerProps {
  defaultType: DefaultPhotoType;
  selectedPhotoID: string;  
  handleOnClick: (photo: IUnsplashPhoto) => Promise<void> | void;
}

export const UnsplashPhotoPicker: React.FC<UnsplashPhotoPickerProps> = (props: UnsplashPhotoPickerProps) => {
  const [state, setStateTo] = useState<IUnsplashPhotoPickerState>(defaultUnsplashPhotoPickerState());
  
  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        const photos: IUnsplashPhoto[] = await DefaultPhotoService.getByType(props.defaultType);

        setStateTo({ photos, status: RequestStatus.Success });
      } catch (err) {
        console.error(err);

        setStateTo({ ...state, status: RequestStatus.Error });
      }
    }

    fetch();
  }, []);

  const getContent = (): JSX.Element | JSX.Element[] => {
    if(state.status === RequestStatus.Success) {
      const photos: JSX.Element[] = state.photos.map((photo: IUnsplashPhoto) => (
        <UnsplashPhotoPickerOption 
          key={photo.id}
          photo={photo} 
          selected={photo.id === props.selectedPhotoID}
          handleOnClick={props.handleOnClick}
        />
      ));   

      return (        
        <div className="unsplash-photo-picker-options">
          {photos}
        </div>
      )
    } else if (state.status === RequestStatus.Loading) {
      return (
        <LoadingIcon wrapperClass />
      )
    }
  }

  return (
    <div className="unsplash-photo-picker">
      {getContent()}
    </div>
  )
}