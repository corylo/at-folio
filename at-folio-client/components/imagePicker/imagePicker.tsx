import React from "react";

import { ImagePickerOption } from "./imagePickerOption";

import { ProfileUtility } from "../../utilities/profileUtility";

import { ProfileImageOption } from "../../../at-folio-enums/profileImageOption";

interface ImagePickerProps {
  selectedImage: ProfileImageOption;
  handleOnClick?: (background: ProfileImageOption) => void;
  handleOnClickAsync?: (background: ProfileImageOption) => Promise<void>;
}

export const ImagePicker: React.FC<ImagePickerProps> = (props: ImagePickerProps) => {
  const getOptions = (): JSX.Element[] => {
    return ProfileUtility.getImages().map((image: ProfileImageOption) => {      
      return (
        <ImagePickerOption
          key={image}
          image={image}
          selected={image === props.selectedImage}
          handleOnClick={props.handleOnClick}
          handleOnClickAsync={props.handleOnClickAsync}
        />
      )
    });
  }

  return (
    <div className="image-picker">      
      {getOptions()}
    </div>
  );
}