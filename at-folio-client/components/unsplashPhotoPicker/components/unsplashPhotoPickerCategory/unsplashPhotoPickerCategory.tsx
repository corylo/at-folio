import React from "react";
import classNames from "classnames";

import { DefaultPhotoCategory } from "../../../../../at-folio-enums/defaultPhotoCategory";
import { DefaultPhotoType } from "../../../../../at-folio-enums/defaultPhotoType";

interface UnsplashPhotoPickerCategoryProps {  
  defaultType: DefaultPhotoType | DefaultPhotoCategory;
  selectedType: DefaultPhotoType | DefaultPhotoCategory;
  type: DefaultPhotoType | DefaultPhotoCategory;
  handleOnClick: (type: DefaultPhotoType | DefaultPhotoCategory) => void;
}

export const UnsplashPhotoPickerCategory: React.FC<UnsplashPhotoPickerCategoryProps> = (props: UnsplashPhotoPickerCategoryProps) => {
  const selected: boolean = props.type === props.selectedType;

  return (
    <button 
      className={classNames("unsplash-photo-picker-category-button", "rubik-font", { selected })}
      type="button" 
      onClick={() => props.handleOnClick(props.type)}
    >
      {props.type === props.defaultType ? "Default" : props.type}
    </button>
  )
}