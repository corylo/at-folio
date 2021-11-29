import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { LoadingIcon } from "../../../loading/loadingIcon";
import { ProfilePhoto } from "../../../profilePhoto/profilePhoto";

import { CommandLineContext } from "../../commandLine";

import { ProfileService } from "../../../../services/profileService";

import { defaultCommandLineState } from "../../models/commandLineState";
import { IProfile } from "../../../../../at-folio-models/profile";
import { defaultSearchResultState, ISearchResultState } from "./models/searchResultState";

import { RequestStatus } from "../../../../enums/requestStatus";

interface SearchResultProps {
  index: number;
  uid: string;
  username: string;
}

export const SearchResult: React.FC<SearchResultProps> = (props: SearchResultProps) => {  
  const { state: commandLineState, setStateTo: setCommandLineStateTo } = useContext(CommandLineContext);

  const [state, setStateTo] = useState<ISearchResultState>(defaultSearchResultState());

  const setFocusedTo = (focused: boolean): void => {
    setStateTo({ ...state, focused });
  }

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const profile: IProfile = await ProfileService.getByUID(props.uid);

      setStateTo({ ...state, profile, status: RequestStatus.Success });
    }

    fetch();
  }, []);

  useEffect(() => {
    setFocusedTo(props.index === commandLineState.focusedIndex);
  }, [commandLineState.focusedIndex, state.status]);

  const handleOnClick = (): void => {
    setCommandLineStateTo(defaultCommandLineState());
  }

  const getProfilePhoto = (): JSX.Element => {
    if(state.status === RequestStatus.Success) {
      return (
        <div className="search-result-profile-photo">
          <ProfilePhoto photo={state.profile.photo} />
        </div>
      )
    } else if(state.status === RequestStatus.Loading) {
      return (
        <div className="search-result-profile-photo">
          <LoadingIcon />
        </div>
      )
    }
  }

  return (
    <Link className={classNames("search-result", { focused: state.focused })} to={`/${props.username}`} onClick={handleOnClick}>
      <div className="search-result-profile">
        {getProfilePhoto()}
        <h1 className="search-result-profile-username rubik-font">{props.username}</h1>
      </div>
      <i className="search-result-go-icon fa-regular fa-arrow-turn-down-right" />
    </Link>
  );
}