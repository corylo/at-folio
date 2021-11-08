import React, { useContext } from "react";

import { IconButton } from "../../components/button/iconButton/iconButton";
import { Input } from "../../components/input/input";
import { Page } from "../../components/page/page";

import { AppContext } from "../../components/app/appWrapper";

import { UserStatus } from "../../enums/userStatus";

export const AccountPage: React.FC = () => {  
  const { user, userStatus } = useContext(AppContext);

  console.log(user)

  const getContent = (): JSX.Element => {
    if(userStatus === UserStatus.SignedIn) {
      return (
        <div id="account-details-wrapper">
          <div id="account-details">
            <h1 id="account-details-title" className="rubik-font">Account</h1>
            <div className="account-details-section">
              <div className="account-details-input-wrapper">
                <Input className="account-details-input" label="Email">
                  <input type="text" value={user.email} disabled />
                </Input>
                <IconButton
                  icon="fa-regular fa-pen"
                  handleOnClick={() => {}}
                />
              </div>
            </div>
            <div className="account-details-section">
              <div className="account-details-input-wrapper">
                <Input className="account-details-input" label="Password">
                  <input type="password" value="password" disabled />
                </Input>
                <IconButton
                  icon="fa-regular fa-pen"
                  handleOnClick={() => {}}
                />
              </div>
            </div>
            <div className="account-details-section">
              <button
                type="button"
                className="button delete rubik-font"
                onClick={() => {}}
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <Page id="account-page" signInRequired>
      {getContent()}
    </Page>
  )
}