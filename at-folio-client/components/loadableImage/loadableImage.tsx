import React from "react";
import classNames from "classnames";

import { useLoadImageEffect } from "../../effects/imageEffects";

import { ImageStatus } from "../../enums/imageStatus";

interface LoadableImageProps {
  className?: string;
  previewSource?: string;
  source: string;
}

export const LoadableImage: React.FC<LoadableImageProps> = (props: LoadableImageProps) => {
  const { status } = useLoadImageEffect(props.previewSource, props.source);

  if(status !== ImageStatus.Waiting) {
    const source: string = status === ImageStatus.Loaded ? props.source : props.previewSource;

    return (
      <div 
        className={classNames("loadable-image", props.className, { preview: source === props.previewSource })} 
        style={{ backgroundImage: `url(${source})` }} 
      />
    )
  }

  return null;
}