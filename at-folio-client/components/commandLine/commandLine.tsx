import React, { createContext, useContext, useEffect, useState } from "react";
import classNames from "classnames";

import { Logo } from "../logo/logo";
import { ProfilePhoto } from "../profilePhoto/profilePhoto";
import { SearchResults } from "./components/searchResults/searchResults";

import { AppContext } from "../app/appWrapper";

import { AlgoliaService } from "../../services/algoliaService";

import { ICommandLineContext } from "./models/commandLineContext";
import { defaultCommandLineState, ICommandLineState } from "./models/commandLineState";
import { IProfileSearchResult } from "../../../at-folio-models/profileSearchResult";

import { RequestStatus } from "../../enums/requestStatus";

export const CommandLineContext = createContext<ICommandLineContext>(null);

interface CommandLineProps {
  
}

export const CommandLine: React.FC<CommandLineProps> = (props: CommandLineProps) => {
  const { appState, setAppTogglesTo } = useContext(AppContext);

  const { profile } = appState;

  const [state, setStateTo] = useState<ICommandLineState>(defaultCommandLineState());

  const active: boolean = state.query.trim() !== "";

  useEffect(() => {
    if(state.results.length > 0) {
      setStateTo({ ...state, activeQuery: "", results: [] });
    }
  }, [state.query]);

  const setStatusTo = (status: RequestStatus): void => {
    setStateTo({ ...state, status });
  }
  
  const setQueryTo = (query: string): void => {
    setStateTo({ ...state, query });
  }

  const setFocusedTo = (focused: boolean): void => {
    setStateTo({ ...state, focused });
  }

  const startSearch = (): void => {
    setStateTo({ 
      ...state, 
      results: [], 
      status: RequestStatus.Loading
    });
  }

  const completeSearch = (results: IProfileSearchResult[]): void => {
    setStateTo({ 
      ...state,
      activeQuery: state.query,
      results, 
      status: RequestStatus.Success 
    });
  }

  const handleGo = async (): Promise<void> => {    
    if(active && state.query !== state.activeQuery) {
      try {
        startSearch();

        const results: IProfileSearchResult[] = await AlgoliaService.search(state.query);

        completeSearch(results);
      } catch (err) {
        console.error(err);

        setStatusTo(RequestStatus.Idle);
      }
    }
  }
  
  const handleOnKeyDown = (e: any): void => {
    if(e.key === "Enter") {
      handleGo();
    }
  }

  const getResults = (): JSX.Element => {
    if(state.focused) {
      return (
        <SearchResults />
      );
    }
  }

  return (
    <CommandLineContext.Provider value={{ state, setStateTo }}>
      <div id="command-line-wrapper" className={classNames({ active })}>
        <div id="command-line" className={classNames({ active })}>
          <Logo />
          <input
            autoComplete="off"
            id="command-line-input"
            className="rubik-font"
            placeholder="Search usernames"
            type="text"        
            value={state.query}
            onFocus={() => setFocusedTo(true)}
            onChange={(e: any) => setQueryTo(e.target.value)}
            onKeyDown={handleOnKeyDown}
          />
          <ProfilePhoto
            photo={profile.photo}
            handleOnClick={() => setAppTogglesTo({ mainMenu: true })} 
          />
        </div>
        {getResults()}
      </div>
    </CommandLineContext.Provider>
  );
}