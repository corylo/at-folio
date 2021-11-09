import React, { createContext, useContext, useState } from "react";

import { EmailVerificationStatus } from "../../components/emailVerificationStatus/emailVerificationStatus";
import { IconButton } from "../../components/button/iconButton/iconButton";
import { Input } from "../../components/input/input";
import { Page } from "../../components/page/page";
import { UpdateEmailModal } from "./components/updateEmailModal/updateEmailModal";
import { UpdatePasswordModal } from "./components/updatePasswordModal/updatePasswordModal";

import { AppContext } from "../../components/app/appWrapper";

import { IAccountPageContext } from "./models/accountPageContext";
import { defaultAccountPageState, IAccountPageState } from "./models/accountPageState";

import { AccountAction } from "./enums/accountAction";
import { UserStatus } from "../../enums/userStatus";

export const AccountPageContext = createContext<IAccountPageContext>(null);

export const AccountPage: React.FC = () => {  
  const { user, userStatus } = useContext(AppContext);

  const [state, setStateTo] = useState<IAccountPageState>(defaultAccountPageState());

  const setActionTo = (action: AccountAction): void => {
    setStateTo({ ...state, action });
  }

  const getContent = (): JSX.Element => {
    if(userStatus === UserStatus.SignedIn) {
      return (
        <React.Fragment>
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
                    handleOnClick={() => setActionTo(AccountAction.UpdateEmail)}
                  />
                </div>
                <EmailVerificationStatus />
              </div>
              <div className="account-details-section">
                <div className="account-details-input-wrapper">
                  <Input className="account-details-input" label="Password">
                    <input type="password" value="password" disabled />
                  </Input>
                  <IconButton
                    icon="fa-regular fa-pen"
                    handleOnClick={() => setActionTo(AccountAction.UpdatePassword)}
                  />
                </div>
              </div>
              <div className="account-details-section">
                <button
                  type="button"
                  className="button delete rubik-font"
                  onClick={() => setActionTo(AccountAction.DeleteAccount)}
                >
                  Delete account
                </button>
              </div>
            </div>
          </div>
          <UpdateEmailModal />
          <UpdatePasswordModal />
        </React.Fragment>
      )
    }
  }

  return (
    <AccountPageContext.Provider value={{ state, action: state.action, setStateTo, setActionTo }}>
      <Page id="account-page" signInRequired>
        {getContent()}
      </Page>
    </AccountPageContext.Provider>
  )
}