import React from "react";

import { WrappableComponent } from "../wrappableComponent/wrappableComponent";

interface LoadingSpinnerProps {
  wrapperID?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props: LoadingSpinnerProps) => {  
  return (
    <WrappableComponent wrapperID={props.wrapperID}>
      <div className="loading-spinner">
        <i className="fa-solid fa-at" />
      </div>
    </WrappableComponent>
  );
}