import React from "react";
import classNames from "classnames";

import { WrappableComponent } from "../wrappableComponent/wrappableComponent";

interface LoadingIconProps {
  icon?: string;
  wrapperClass?: string | true;
}

export const LoadingIcon: React.FC<LoadingIconProps> = (props: LoadingIconProps) => {  
  const classes: string = classNames(
    props.icon || "fa-regular fa-spinner-third", 
    "loading-icon", 
    "spin-animation"
  );

  const getWrapperClass = (): string => {
    if(props.wrapperClass !== undefined) {
      if(props.wrapperClass === true) {
        return "default-loading-icon-wrapper";
      }
      
      return props.wrapperClass;
    }

    return null;
  }

  return (
    <WrappableComponent wrapperClass={getWrapperClass()}>
      <i className={classes} />
    </WrappableComponent>
  );
}