import React from "react";
import classNames from "classnames";

interface WrappableComponentProps {
  children: any;
  wrapperClass?: string;
  wrapperID?: string;
}

export const WrappableComponent: React.FC<WrappableComponentProps> = (props: WrappableComponentProps) => {
  if(props.wrapperID || props.wrapperClass) {
    return (
      <div id={props.wrapperID} className={classNames(props.wrapperClass)}>
        {props.children}
      </div>
    )
  }

  return props.children;
}