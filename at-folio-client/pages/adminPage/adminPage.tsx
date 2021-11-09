import React, { useContext } from "react";

import { Page } from "../../components/page/page";
import { SocialPlatformManager } from "./components/socialPlatformManager/socialPlatformManager";

import { AppContext } from "../../components/app/appWrapper";

import { RequestStatus } from "../../enums/requestStatus";
import { UserStatus } from "../../enums/userStatus";

export const AdminPage: React.FC = () => {
  const { userStatus } = useContext(AppContext);

  const getContent = (): JSX.Element => {
    if(userStatus === UserStatus.SignedIn) {
      return (
        <div id="admin-page-content">
          <h1 id="admin-page-content-title" className="rubik-font">Admin</h1>
          <div id="admin-page-content-sections">
            <SocialPlatformManager />
          </div>
        </div>
      )
    }
  }

  return (
    <Page id="admin-page" status={RequestStatus.Success} adminRequired>
      {getContent()}
    </Page>
  )
}