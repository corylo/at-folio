import { useContext, useEffect } from "react";

import { AppContext } from "../../../components/app/appWrapper";

import { LinkService } from "../../../services/linkService";

import { IAdminPageState } from "../models/adminPageState";
import { ILink } from "../../../../at-folio-models/link";

import { RequestStatus } from "../../../enums/requestStatus";
import { UserStatus } from "../../../enums/userStatus";

export const useFetchLinksEffect = (
  state: IAdminPageState, 
  setStatusTo: (status: RequestStatus) => void
): void => {
  const { appState, setProfileTo } = useContext(AppContext);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        if(appState.userStatus === UserStatus.SignedIn) {          
          if(appState.profile.username !== "") {
            const links: ILink[] = await LinkService.getByUsername(appState.profile.username);

            setProfileTo({ links });
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