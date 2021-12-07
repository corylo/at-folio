import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

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

export const CommandLine: React.FC = () => {
  const { profile, setAppTogglesTo } = useContext(AppContext);
  
  const [state, setStateTo] = useState<ICommandLineState>(defaultCommandLineState());

  const history: any = useHistory();

  const ref: React.MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(state.activeQuery !== "") {
      setStateTo({ ...state, activeQuery: "", focusedIndex: -1, results: [] });
    }
  }, [state.query]);

  const setQueryTo = (query: string): void => {
    setStateTo({ ...state, query });
  }

  const setFocusedTo = (focused: boolean): void => {
    setStateTo({ ...state, focused });
  }

  const setFocusedIndexTo = (focusedIndex: number): void => {
    setStateTo({ ...state, focusedIndex });
  }

  const startSearch = (): void => {
    setStateTo({ 
      ...state, 
      focusedIndex: -1,
      results: [], 
      status: RequestStatus.Loading
    });
  }

  const completeSearch = (results: IProfileSearchResult[]): void => {
    setStateTo({ 
      ...state,
      activeQuery: state.query,
      focusedIndex: -1,
      results, 
      status: RequestStatus.Success 
    });
  }

  const handleGo = async (): Promise<void> => {    
    try {
      startSearch();

      const results: IProfileSearchResult[] = await AlgoliaService.search(state.query);

      completeSearch(results);
    } catch (err) {
      console.error(err);

      setStateTo({ ...state, status: RequestStatus.Error });
    }
  }

  const handleNextIndex = (e: any): void => {
    e.preventDefault();

    if(state.focusedIndex === state.results.length - 1) {
      setFocusedIndexTo(0);
    } else {
      setFocusedIndexTo(state.focusedIndex + 1);
    }
  }

  const handlePrevIndex = (e: any): void => {    
    e.preventDefault();

    if(state.focusedIndex === 0) {
      setFocusedIndexTo(state.results.length - 1);
    } else {
      setFocusedIndexTo(state.focusedIndex - 1);
    }
  }
  
  const handleOnKeyDown = (e: any): void => {
    if(e.key === "Enter") {
      if(state.focusedIndex > -1) {
        const result: IProfileSearchResult = state.results[state.focusedIndex];

        history.push(`/${result.username}`);

        ref.current.blur();

        setStateTo(defaultCommandLineState());   
      } else if (state.query.trim() !== "" && state.query !== state.activeQuery) {
        handleGo();
      }
    } else if (state.results.length > 0) {
      if((e.shiftKey && e.key === "Tab") || e.key === "ArrowUp") {
        handlePrevIndex(e);
      } else if (e.key === "Tab" || e.key === "ArrowDown") {
        handleNextIndex(e);
      }
    } else if (state.query.trim() === "") {
      if(e.key === "Tab") {
        setStateTo(defaultCommandLineState());
      }
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
      <div id="command-line-wrapper">
        <div id="command-line">
          <Logo />
          <input
            autoComplete="off"
            id="command-line-input"
            className="rubik-font"
            placeholder="Search"
            ref={ref}
            type="text"        
            value={state.query}
            onChange={(e: any) => setQueryTo(e.target.value)}
            onKeyDown={handleOnKeyDown}
            onFocus={() => setFocusedTo(true)}
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