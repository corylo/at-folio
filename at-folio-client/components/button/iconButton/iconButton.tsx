import React from "react";
import classNames from "classnames";

interface IconButtonProps {
  className?: string;
  icon: string;
  tabIndex?: number;
  handleOnClick: () => void;
}

export const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
  return (
    <button 
      className={classNames("icon-button", props.className)} 
      tabIndex={props.tabIndex || 0}
      type="button" 
      onClick={props.handleOnClick}
    >
      <i className={props.icon} />
    </button>
  );
}