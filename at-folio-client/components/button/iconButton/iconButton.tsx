import React from "react";
import classNames from "classnames";

interface IconButtonProps {
  className?: string;
  icon: string;
  handleOnClick: () => void;
}

export const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
  return (
    <button className={classNames("icon-button", props.className)} type="button" onClick={props.handleOnClick}>
      <i className={props.icon} />
    </button>
  );
}