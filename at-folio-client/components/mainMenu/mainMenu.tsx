import React, { useContext, useState } from "react";

import { IconButton } from "../button/iconButton/iconButton";
import { Logo } from "../logo/logo";
import { Modal } from "../modal/modal";
import { ProfileHeader } from "../profileHeader/profileHeader";

import { AppContext } from "../app/appWrapper";

import { AuthService } from "../../services/authService";

import { defaultMainMenuState, IMainMenuState } from "./models/mainMenuState";

import { RequestStatus } from "../../enums/requestStatus";

interface MainMenuProps {
  
}

export const MainMenu: React.FC<MainMenuProps> = (props: MainMenuProps) => {
  const { appState, setAppToggles } = useContext(AppContext);

  const [state, setState] = useState<IMainMenuState>(defaultMainMenuState());

  const setStatusTo = (status: RequestStatus): void => {
    setState({ ...state, status });
  }

  const signOut = async (): Promise<void> => {
    try {
      setStatusTo(RequestStatus.Loading);

      await AuthService.signOut();

      setStatusTo(RequestStatus.Success);
    } catch (err) {
      console.error(err);
      
      setStatusTo(RequestStatus.Error);
    }
  }
  
  return (
    <Modal contentID="main-menu" status={state.status} toggled={appState.toggles.mainMenu}>
      <Logo wrapperID="main-menu-logo" />
      <div id="main-menu-content">
        <div id="main-menu-toolbar">
          <ProfileHeader 
            image="/img/profile.png"
            username="WaffApps"
            wrapperID="main-menu-header" 
          />
          <IconButton 
            className="close-button"
            icon="fa-regular fa-xmark" 
            handleOnClick={() => setAppToggles({ mainMenu: false })} 
          />
        </div>  
        <div id="main-menu-body">
          <div className="main-menu-body-section">
            <button type="button" className="button rubik-font" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}