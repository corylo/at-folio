import React, { useContext } from "react";

import { CommandLineContext } from "../../commandLine";
import { LoadingIcon } from "../../../loading/loadingIcon";
import { SearchResult } from "../searchResult/searchResult";

import { useOnElementBlurEffect } from "../../../../effects/domEffects";

import { IProfileSearchResult } from "../../../../../at-folio-models/profileSearchResult";

import { RequestStatus } from "../../../../enums/requestStatus";
import { SearchStatement } from "../searchStatement/searchStatement";

export const SearchResults: React.FC = () => {  
  const { state, setStateTo } = useContext(CommandLineContext);

  const handleOnBlur = (): void => {
    setStateTo({ ...state, focused: false });
  }

  useOnElementBlurEffect(true, ["command-line", "command-line-search-results"], [], handleOnBlur);

  const getContent = (): JSX.Element => {
    if(state.status === RequestStatus.Loading) {
      return (
        <SearchStatement text="Searching...">
          <LoadingIcon />
        </SearchStatement>
      )
    } else if (state.status === RequestStatus.Error) {
      return (
        <SearchStatement icon="fa-regular fa-magnifying-glass" text="Error loading results" />
      )
    } else if(state.query.trim() === "") {
      return (
        <SearchStatement icon="fa-regular fa-magnifying-glass" text="Start typing" />
      )
    } else if (state.query !== state.activeQuery) {
      return (
        <SearchStatement icon="fa-regular fa-arrow-turn-down-left" text="Hit enter to search" />
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