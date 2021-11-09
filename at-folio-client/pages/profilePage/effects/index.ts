import { useContext, useEffect } from "react";
import { useRouteMatch } from "react-router";

import { ProfilePageContext } from "../profilePageWrapper";

import { LinkService } from "../../../services/linkService";
import { ProfileService } from "../../../services/profileService";

import { IProfile } from "../../../../at-folio-models/profile";
import { defaultProfilePageState } from "../models/profilePageState";

import { RequestStatus } from "../../../enums/requestStatus";

export const useFetchProfileEffect = (): void => {
  const { state, setStateTo } = useContext(ProfilePageContext);

  const match: any = useRouteMatch();

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        if(match.params.username) {
          const { username } = match.params;

          const profile: IProfile = await ProfileService.getByUsername(username);

          if(profile) {
            profile.links = await LinkService.getByUID(profile.uid);

            setStateTo({ ...state, profile, status: RequestStatus.Success });
          } else {
            console.error(`Profile: ${match.params.username} does not exist.`);

            setStateTo({ 
              ...defaultProfilePageState(), 
              errorMessage: "This user does not exist!", 
              status: RequestStatus.Error 
            });
          }
        }
      } catch (err) {
        console.error(err);

        setStateTo({ ...defaultProfilePageState(), status: RequestStatus.Error });
      }
    }

    fetch();
  }, [match.params.username]);
}