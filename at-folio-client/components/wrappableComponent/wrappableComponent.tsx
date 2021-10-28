import React from "react";
import classNames from "classnames";

interface WrappableComponentProps {
  children: any;
  defaultWrapperClass?: string;
  wrapperClass?: string | true;
  wrapperID?: string;
}

export const WrappableComponent: React.FC<WrappableComponentProps> = (props: WrappableComponentProps) => {
  if(props.wrapperID || props.wrapperClass) {
    const getWrapperClass = (): string => {
      if(props.wrapperClass !== undefined) {
        if(props.wrapperClass === true) {
          return props.defaultWrapperClass;
        }
        
        return props.wrapperClass;
      }
  
      return null;
    }
  
    return (
      <div id={props.wrapperID} className={classNames(getWrapperClass())}>
        {props.children}
      </div>
    )
  }

  return props.children;
}