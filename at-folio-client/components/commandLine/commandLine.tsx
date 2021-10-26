import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import classNames from "classnames";

import { Logo } from "../logo/logo";
import { ProfileImage } from "../profileImage/profileImage";

import { AppContext } from "../app/appWrapper";

import { defaultCommandLineState, ICommandLineState } from "./models/commandLineState";
import { IconButton } from "../button/iconButton/iconButton";

interface CommandLineProps {
  
}

export const CommandLine: React.FC<CommandLineProps> = (props: CommandLineProps) => {
  const { setAppToggles } = useContext(AppContext);

  const [state, setState] = useState<ICommandLineState>(defaultCommandLineState());

  const active: boolean = state.query.trim() !== "";

  const location: any = useLocation(),
    history: any = useHistory();

  const setQueryTo = (query: string): void => {
    setState({ ...state, query });
  }

  const handleGo = (): void => {    
    if(active) {
      setQueryTo("");

      if(state.query !== location.pathname.slice(1)) {
        history.push(`/${state.query}`);
      }
    }
  }
  
  const handleOnKeyDown = (e: any): void => {
    if(e.key === "Enter") {
      handleGo();
    }
  }

  return (
    <div id="command-line" className={classNames({ active })}>
      <Logo />
      <input
        id="command-line-input"
        className="rubik-font"
        placeholder="Search..."
        type="text"        
        value={state.query}
        onChange={(e: any) => setQueryTo(e.target.value)}
        onKeyDown={handleOnKeyDown}
      />
      <div id="command-line-go-button-wrapper">
        <IconButton 
          className="go-button" 
          icon="fa-regular fa-arrow-right" 
          handleOnClick={handleGo} 
        />
      </div>
      <ProfileImage 
        image="/img/profile.png" 
        handleOnClick={() => setAppToggles({ mainMenu: true })} 
      />
    </div>
  );
}