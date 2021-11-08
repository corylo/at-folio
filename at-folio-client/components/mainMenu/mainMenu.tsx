import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { IconButton } from "../button/iconButton/iconButton";
import { Logo } from "../logo/logo";
import { MainMenuOption } from "./mainMenuOption";
import { Modal } from "../modal/modal";
import { ProfileHeader } from "../profileHeader/profileHeader";
import { ProfilePhoto } from "../profilePhoto/profilePhoto";

import { AppContext } from "../app/appWrapper";

import { AuthService } from "../../services/authService";

import { defaultMainMenuState, IMainMenuState } from "./models/mainMenuState";

import { RequestStatus } from "../../enums/requestStatus";

interface MainMenuProps {
  
}

export const MainMenu: React.FC<MainMenuProps> = (props: MainMenuProps) => {
  const { appState, setAppTogglesTo } = useContext(AppContext);

  const { profile, toggles } = appState;

  const [state, setState] = useState<IMainMenuState>(defaultMainMenuState());

  const setStatusTo = (status: RequestStatus): void => {
    setState({ ...state, status });
  }

  const signOut = async (): Promise<void> => {
    try {
      setStatusTo(RequestStatus.Loading);

      await AuthService.signOut();
    } catch (err) {
      console.error(err);
      
      setStatusTo(RequestStatus.Error);
    }
  }

  const detoggle = () => {
    setAppTogglesTo({ mainMenu: false });
  }
  
  return (
    <Modal 
      contentID="main-menu" 
      status={state.status} 
      toggled={toggles.mainMenu}
      handleOnBackgroundClick={detoggle}
    >
      <Logo wrapperID="main-menu-logo" />
      <div id="main-menu-content">
        <div id="main-menu-toolbar">
          <ProfileHeader 
            photo={profile.photo}
            username={profile.username}
            wrapperID="main-menu-header" 
          />
          <IconButton 
            className="close-button"
            icon="fa-regular fa-xmark" 
            handleOnClick={detoggle} 
          />
        </div>  
        <div id="main-menu-body">
          <div className="main-menu-body-section">
            <MainMenuOption 
              description="Update your photo, background, and links"
              icon={<ProfilePhoto photo={profile.photo} />}
              label="Profile"
              to="/me" 
              handleOnClick={detoggle}
            />
            <MainMenuOption 
              description="Update your email and password"
              icon="fa-regular fa-user"
              label="Account"
              to="/account"
              handleOnClick={detoggle}
            />
            <MainMenuOption 
              description="See what my page looks like to viewers"
              icon="fa-regular fa-link"
              label="My Link"
              to={`/${profile.username}`}
              handleOnClick={detoggle}
            />
          </div>
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