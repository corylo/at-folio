import React, { useEffect, useState } from "react";

import { LoadingIcon } from "../loading/loadingIcon";
import { UnsplashPhotoPickerCategory } from "./components/unsplashPhotoPickerCategory/unsplashPhotoPickerCategory";
import { UnsplashPhotoPickerOption } from "./components/unsplashPhotoPickerOption/unsplashPhotoPickerOption";

import { DefaultPhotoService } from "../../services/defaultPhotoService";

import { PhotoUtility } from "../../../at-folio-utilities/photoUtility";

import { IUnsplashPhoto } from "../../../at-folio-models/unsplashPhoto";
import { defaultUnsplashPhotoPickerState, IUnsplashPhotoPickerState } from "./models/unsplashPhotoPickerState";

import { DefaultPhotoCategory } from "../../../at-folio-enums/defaultPhotoCategory";
import { DefaultPhotoType } from "../../../at-folio-enums/defaultPhotoType";
import { RequestStatus } from "../../enums/requestStatus";

interface UnsplashPhotoPickerProps {
  type: DefaultPhotoType | DefaultPhotoCategory;
  selectedPhotoID: string;  
  handleOnClick: (photo: IUnsplashPhoto) => Promise<void> | void;
}

export const UnsplashPhotoPicker: React.FC<UnsplashPhotoPickerProps> = (props: UnsplashPhotoPickerProps) => {
  const [state, setStateTo] = useState<IUnsplashPhotoPickerState>(defaultUnsplashPhotoPickerState(props.type));
  
  const setStatusTo = (status: RequestStatus): void => {
    setStateTo({ ...state, status });
  }

  const setSelectedTypeTo = (selectedType: DefaultPhotoType | DefaultPhotoCategory): void => {
    setStateTo({ ...state, selectedType });
  }

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        setStatusTo(RequestStatus.Loading);

        const photos: IUnsplashPhoto[] = await DefaultPhotoService.getByType(state.selectedType);

        setStateTo({ ...state, photos, status: RequestStatus.Success });
      } catch (err) {
        console.error(err);

        setStatusTo(RequestStatus.Error);
      }
    }

    fetch();
  }, [state.selectedType]);

  const getContent = (): JSX.Element | JSX.Element[] => {
    if(state.status === RequestStatus.Success) {
      const getCategories = (): JSX.Element => {
        const categories: JSX.Element[] = [props.type, ...PhotoUtility.getDefaultCategories()].map((type: DefaultPhotoType | DefaultPhotoCategory) => {
          return (
            <UnsplashPhotoPickerCategory
              key={type}
              defaultType={props.type}
              selectedType={state.selectedType}
              type={type}
              handleOnClick={setSelectedTypeTo}
            />
          )
        });

        return (        
          <div className="unsplash-photo-picker-categories">
            {categories}
          </div>
        )
      }

      const getOptions = (): JSX.Element => {
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
      }

      return (
        <React.Fragment>
          {getCategories()}
          {getOptions()}
        </React.Fragment>
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