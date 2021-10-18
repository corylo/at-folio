import React from "react";
import { Link } from "react-router-dom";

export const Logo: React.FC = () => {
  return (
    <Link className="logo" to="/">
      <h1 className="lobster-font">@folio</h1>
    </Link>
  )
}