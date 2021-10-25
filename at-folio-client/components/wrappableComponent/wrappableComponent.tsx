import React from "react";

interface WrappableComponentProps {
  children: any;
  wrapperID?: string;
}

export const WrappableComponent: React.FC<WrappableComponentProps> = (props: WrappableComponentProps) => {
  if(props.wrapperID) {
    return (
      <div id={props.wrapperID}>
        {props.children}
      </div>
    )
  }

  return props.children;
}