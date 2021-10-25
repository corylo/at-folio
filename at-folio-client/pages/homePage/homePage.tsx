import React from "react";

import { Page } from "../../components/page/page";

import { RequestStatus } from "../../enums/requestStatus";

export const HomePage: React.FC = () => {  
  return (
    <Page id="home-page" status={RequestStatus.Success}>
      <div id="brand-statement">
        <h1 className="rubik-font">The link in bio that <span className="highlight">looks good</span>.</h1>
      </div>
    </Page>
  )
}