import React from "react";
import classNames from "classnames";

import { LoadingIcon } from "../loading/loadingIcon";

import { useLoadImageEffect } from "../../effects/imageEffects";

import { ImageStatus } from "../../enums/imageStatus";

interface LoadableImageProps {
  className?: string;
  previewSource?: string;
  showLoadingIcon?: boolean;
  source: string;
}

export const LoadableImage: React.FC<LoadableImageProps> = (props: LoadableImageProps) => {
  const { status } = useLoadImageEffect(props.previewSource, props.source);

  if(status !== ImageStatus.Waiting) {
    const source: string = status === ImageStatus.Loaded ? props.source : props.previewSource;
    
    const getLoadingIcon = (): JSX.Element => {
      if(props.showLoadingIcon && status === ImageStatus.Preview) {
        return (
          <LoadingIcon />
        )
      }
    }

    const classes: string = classNames(
      "loadable-image-wrapper", 
      props.className, { 
      preview: source === props.previewSource 
    });

    return (
      <div className={classes}>
        <div className="loadable-image" style={{ backgroundImage: `url(${source})` }} />
        {getLoadingIcon()}
      </div>
    )
  }

  return null;
}