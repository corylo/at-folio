import React from "react";

import { IUnsplashPhotoReference } from "../../../at-folio-models/unsplashPhotoReference";

interface PhotoPickerToggleProps {
  label: string;
  selectedPhoto: IUnsplashPhotoReference;
  handleOnToggle: () => void;
}

export const PhotoPickerToggle: React.FC<PhotoPickerToggleProps> = (props: PhotoPickerToggleProps) => {  
  const { selectedPhoto } = props;

  const getIcon = (icon: string): JSX.Element => {
    return (
      <div className="icon">
        <i className={icon} />
      </div>
    )
  }
  
  const getContent = (): JSX.Element => {
    if(selectedPhoto.id !== "") {
      return (
        <React.Fragment>
          <div 
            className="selected-photo" 
            style={{ backgroundImage: `url(${props.selectedPhoto.urls.thumb})` }} 
          />      
          {getIcon("fa-regular fa-pen")}
        </React.Fragment>
      )
    }

    return getIcon("fa-regular fa-plus");
  }
  return (
    <div className="photo-picker-toggle">
      <button 
        className="photo-picker-toggle-button" 
        type="button" 
        onClick={props.handleOnToggle}
      >
        {getContent()}
      </button>
      <h1 className="photo-picker-toggle-label rubik-font">{props.label}</h1>
    </div>
  );
}