import React from "react";
import classNames from "classnames";

interface InputProps {
  children: any;
  className?: string;
  label: string;
}

export const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <div className={classNames("input", props.className)}>
      <div className="input-content">
        {props.children}
      </div>
      <div className="input-info">
        <h1 className="input-label rubik-font">{props.label}</h1>        
      </div>
    </div>
  );
}