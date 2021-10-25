import React from "react";
import { Link } from "react-router-dom";

import { WrappableComponent } from "../wrappableComponent/wrappableComponent";

interface LogoProps {
  wrapperID?: string;
}

export const Logo: React.FC<LogoProps> = (props: LogoProps) => {
  return (
    <WrappableComponent wrapperID={props.wrapperID}>
      <Link className="logo" to="/">
        <i className="fa-regular fa-at" />
        <span className="rubik-font">folio</span>
      </Link>
    </WrappableComponent>
  )
}