import { useEffect } from "react";
import { useRouteMatch } from "react-router";

import { ProfileService } from "../../../services/profileService";

import { IProfile } from "../../../../at-folio-models/profile";
import { IProfilePageState } from "../models/profilePageState";

import { RequestStatus } from "../../../../at-folio-enums/requestStatus";

export const useFetchProfileEffect = (
  state: IProfilePageState, 
  setState: (state: IProfilePageState) => void
): void => {
  const match: any = useRouteMatch();

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        if(match.params.username) {
          const { username } = match.params;

          const profile: IProfile = await ProfileService.getByUsername(username);

          setTimeout(() => {
            setState({ profile, status: RequestStatus.Success });
          }, 1000);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetch();
  }, []);
}