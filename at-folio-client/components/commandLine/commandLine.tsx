import React, { useContext, useState } from "react";
import { useHistory } from "react-router";

import { Logo } from "../logo/logo";
import { ProfileImage } from "../profileImage/profileImage";

import { AppContext } from "../app/appWrapper";

import { defaultCommandLineState, ICommandLineState } from "./models/commandLineState";

interface CommandLineProps {
  
}

export const CommandLine: React.FC<CommandLineProps> = (props: CommandLineProps) => {
  const { setAppToggles } = useContext(AppContext);

  const [state, setState] = useState<ICommandLineState>(defaultCommandLineState());

  const history: any = useHistory();

  const setQueryTo = (query: string): void => {
    setState({ ...state, query });
  }

  const handleOnKeyDown = (e: any): void => {
    if(e.key === "Enter") {
      history.push(`/${state.query}`);
    }
  }

  return (
    <div id="command-line">
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
      <ProfileImage 
        image="/img/profile.png" 
        handleOnClick={() => setAppToggles({ mainMenu: true })} 
      />
    </div>
  );
}