import React, { useContext } from "react";

import { CommandLine } from "../commandLine/commandLine";
import { Logo } from "../logo/logo";

import { AppContext } from "../app/appWrapper";

import { UserStatus } from "../../enums/userStatus";

interface NavbarProps {
  
}

export const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { appState } = useContext(AppContext);

  const getContent = (): JSX.Element => {
    if(appState.userStatus === UserStatus.SignedIn) {
      return (
        <CommandLine />
      )
    } else {
      return (
        <Logo />
      )
    }
  }

  return (
    <div id="navbar">
      {getContent()}     
    </div>
  );
}