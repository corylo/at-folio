import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { WrappableComponent } from "../wrappableComponent/wrappableComponent";

import { AppContext } from "../app/appWrapper";

interface LogoProps {
  wrapperID?: string;
}

export const Logo: React.FC<LogoProps> = (props: LogoProps) => {
  const { setAppTogglesTo } = useContext(AppContext);

  return (
    <WrappableComponent wrapperID={props.wrapperID}>
      <Link className="logo" to="/" onClick={() => setAppTogglesTo({ mainMenu: false })}>
        <i className="fa-regular fa-at" />
        <span className="rubik-font">folio</span>
      </Link>
    </WrappableComponent>
  )
}