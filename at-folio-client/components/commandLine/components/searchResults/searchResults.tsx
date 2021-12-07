import React, { useContext } from "react";

import { CommandLineContext } from "../../commandLine";
import { LoadingIcon } from "../../../loading/loadingIcon";
import { SearchResult } from "../searchResult/searchResult";

import { useOnElementBlurEffect } from "../../../../effects/domEffects";

import { IProfileSearchResult } from "../../../../../at-folio-models/profileSearchResult";

import { RequestStatus } from "../../../../enums/requestStatus";

export const SearchResults: React.FC = () => {  
  const { state, setStateTo } = useContext(CommandLineContext);

  const handleOnBlur = (): void => {
    setStateTo({ ...state, focused: false });
  }

  useOnElementBlurEffect(true, ["command-line", "command-line-search-results"], [], handleOnBlur);

  const getContent = (): JSX.Element => {
    if(state.status === RequestStatus.Loading) {
      return (
        <div id="command-line-search-statement">
          <LoadingIcon />
          <h1 className="rubik-font">Searching...</h1>
        </div>
      )
    } else if(state.query.trim() === "") {
      return (
        <div id="command-line-search-statement">
          <i className="fa-regular fa-magnifying-glass" />
          <h1 className="rubik-font">Start typing</h1>
        </div>
      )
    } else if (state.query !== state.activeQuery) {
      return (
        <div id="command-line-search-statement">
          <i className="fa-regular fa-arrow-turn-down-left" />
          <h1 className="rubik-font">Hit enter to search</h1>
        </div>
      )
    } else if (state.results.length > 0) {
      const results: JSX.Element[] = state.results.map((result: IProfileSearchResult, index: number) => (
        <SearchResult 
          key={result.uid} 
          index={index}
          uid={result.uid} 
          username={result.username} 
        />
      ));

      return (
        <div id="command-line-search-results-list">
          {results}
        </div>
      )
    } else {
      return (
        <div id="command-line-search-statement">
          <i className="fa-regular fa-magnifying-glass" />
          <h1 className="rubik-font">No users found</h1>
        </div>
      )
    }
  }

  return (
    <div id="command-line-search-results">
      {getContent()}
    </div>
  )
}