import React from "react";

import { Page } from "../../components/page/page";

import { RequestStatus } from "../../../at-folio-enums/requestStatus";

export const HomePage: React.FC = () => {
  return (
    <Page id="home-page" status={RequestStatus.Success}>

    </Page>
  )
}