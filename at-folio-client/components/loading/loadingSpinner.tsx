import React from "react";

interface LoadingSpinnerProps {
  wrapperID?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props: LoadingSpinnerProps) => {
  if(props.wrapperID) {
    return (
      <div id={props.wrapperID}>
        <div className="loading-spinner">
          <i className="fa-solid fa-at" />
        </div>
      </div>
    )
  }

  return (
    <div className="loading-spinner">
      <i className="fa-solid fa-at" />
    </div>
  )
}