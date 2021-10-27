import { useContext, useEffect } from "react";

import { AppContext } from "../../../components/app/appWrapper";

import { LinkService } from "../../../services/linkService";

import { IAdminPageState } from "../models/adminPageState";
import { IProfile } from "../../../../at-folio-models/profile";

import { RequestStatus } from "../../../enums/requestStatus";
import { UserStatus } from "../../../enums/userStatus";

export const useFetchLinksEffect = (
  state: IAdminPageState, 
  setStatusTo: (status: RequestStatus) => void
): void => {
  const { appState } = useContext(AppContext);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        if(appState.userStatus === UserStatus.SignedIn) {
          const profile: IProfile = { ...appState.profile };

          if(appState.profile.username !== "") {
            profile.links = await LinkService.getByUsername(appState.profile.username);
          }

          setStatusTo(RequestStatus.Success);
        }
      } catch (err) {
        console.error(err);

        setStatusTo(RequestStatus.Error);
      }
    }

    fetch();
  }, [appState.userStatus, appState.profile.username]);
}