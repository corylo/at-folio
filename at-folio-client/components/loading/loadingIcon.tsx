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

  return (
    <WrappableComponent wrapperClass={props.wrapperClass} defaultWrapperClass="default-loading-icon-wrapper">
      <i className={classes} />
    </WrappableComponent>
  );
}