import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  wrapperID?: string;
}

export const Logo: React.FC<LogoProps> = (props: LogoProps) => {
  if(props.wrapperID) {
    return (
      <div id={props.wrapperID}>
        <Link className="logo lobster-font" to="/">
          @folio
        </Link>
      </div>
    )
  }

  return (
    <Link className="logo lobster-font" to="/">
      @folio
    </Link>
  )
}