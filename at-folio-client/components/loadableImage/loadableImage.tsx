import React from "react";
import classNames from "classnames";

import { useLoadImageEffect } from "../../effects/imageEffects";

import { ImageUtility } from "../../utilities/imageUtility";

import { ImageSize } from "../../enums/imageSize";
import { ImageStatus } from "../../enums/imageStatus";

interface LoadableImageProps {
  className?: string;
  size?: ImageSize;
  source: string;
}

export const LoadableImage: React.FC<LoadableImageProps> = (props: LoadableImageProps) => {
  const imageSource: string = ImageUtility.getSourceBySize(props.source, props.size),
    previewSource: string = ImageUtility.getPreviewSource(props.source);

  const { status } = useLoadImageEffect(previewSource, imageSource);

  if(status !== ImageStatus.Waiting) {
    const source: string = status === ImageStatus.Loaded ? imageSource : previewSource;

    return (
      <div 
        className={classNames("loadable-image", props.className, { preview: source === previewSource })} 
        style={{ backgroundImage: `url(${source})` }} 
      />
    )
  }

  return null;
}