import React from "react";

import { CreatorGridBackground } from "../../components/creatorGridBackground/creatorGridBackground";
import { SvgBackground } from "../../components/svgBackground/svgBackground";

export const AuthPageBackground: React.FC = () => {
  return (
    <div id="auth-page-background">
      <CreatorGridBackground />
      <SvgBackground wrapperID="auth-page-background-svg" />
    </div>
  )
}