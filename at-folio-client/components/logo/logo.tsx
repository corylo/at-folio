import React from "react";
import { Link } from "react-router-dom";

export const Logo: React.FC = () => {
  return (
    <Link className="logo lobster-font" to="/">
      @folio
    </Link>
  )
}