import React from "react";
import classNames from "classnames";

interface IconButtonProps {
  className?: string;
  id?: string;
  icon: string;
  label?: string;
  tabIndex?: number;
  handleOnClick: () => void;
}

export const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
  const getLabel = (): JSX.Element => {
    if(props.label) {
      return (
        <h1 className="rubik-font">{props.label}</h1>
      )
    }
  }

  return (
    <button 
      className={classNames("icon-button", props.className)} 
      id={props.id}
      tabIndex={props.tabIndex || 0}
      type="button" 
      onClick={props.handleOnClick}
    >
      <i className={props.icon} />
      {getLabel()}
    </button>
  );
}