import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { CommandLine } from "../commandLine/commandLine";
import { Logo } from "../logo/logo";

import { AppContext } from "../app/appWrapper";

import { UserStatus } from "../../enums/userStatus";

interface NavbarProps {
  
}

export const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { appState } = useContext(AppContext);

  const location: any = useLocation();

  const getContent = (): JSX.Element => {
    if(appState.userStatus === UserStatus.SignedIn) {
      return (
        <CommandLine />
      )
    } else if (appState.userStatus === UserStatus.SignedOut) {
      const getSignInLink = (): JSX.Element => {        
        if(location.pathname !== "/sign-in") {
          return (
            <Link to="/sign-in" type="button" className="sign-in-link rubik-font">Sign In</Link>
          )
        } 
      }

      return (
        <React.Fragment>
          <Logo />
          {getSignInLink()}
        </React.Fragment>
      )
    }
  }

  return (
    <div id="navbar">
      {getContent()}     
    </div>
  );
}