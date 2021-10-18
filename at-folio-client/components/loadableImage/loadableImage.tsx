import classNames from "classnames";
import React from "react";

import { useLoadImageEffect } from "../../effects/imageEffects";

import { ImageUtility } from "../../utilities/imageUtility";

import { ImageStatus } from "../../../at-folio-enums/imageStatus";

interface LoadableImageProps {
  className?: string;
  source: string;
}

export const LoadableImage: React.FC<LoadableImageProps> = (props: LoadableImageProps) => {
  const previewSource: string = ImageUtility.getPreviewSource(props.source);

  const { status } = useLoadImageEffect(props.source, previewSource);

  if(status !== ImageStatus.Waiting) {
    const source: string = status === ImageStatus.Loaded ? props.source : previewSource;

    return (
      <div 
        className={classNames("loadable-image", props.className, { preview: source === previewSource })} 
        style={{ backgroundImage: `url(${source})` }} 
      />
    )
  }

  return null;
}