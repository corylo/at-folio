import React from "react";

import { Page } from "../../components/page/page";

import { RequestStatus } from "../../enums/requestStatus";

export const AdminPage: React.FC = () => {
  return (
    <Page id="admin-page" status={RequestStatus.Success} adminRequired>
      <div />
    </Page>
  )
}