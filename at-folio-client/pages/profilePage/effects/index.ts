import { useEffect } from "react";
import { useRouteMatch } from "react-router";

import { ProfileService } from "../../../services/profileService";

import { IProfile } from "../../../../at-folio-models/profile";
import { defaultProfilePageState, IProfilePageState } from "../models/profilePageState";

import { RequestStatus } from "../../../enums/requestStatus";

export const useFetchProfileEffect = (
  state: IProfilePageState, 
  setStateTo: (state: IProfilePageState) => void
): void => {
  const match: any = useRouteMatch();

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        if(match.params.username) {
          const { username } = match.params;

          const profile: IProfile = await ProfileService.getByUsername(username);

          if(profile) {
            setStateTo({ profile, status: RequestStatus.Success });
          } else {
            throw new Error(`Profile: ${match.params.username} does not exist.`);
          }
        }
      } catch (err) {
        console.error(err);

        setStateTo({ ...defaultProfilePageState(), status: RequestStatus.Error });
      }
    }

    fetch();
  }, [match.params]);
}