import { useContext, useEffect } from "react";

import { AppContext } from "../../../components/app/appWrapper";
import { ProfileManagerPageContext } from "../profileManagerPageWrapper";

import { LinkService } from "../../../services/linkService";

import { ILink } from "../../../../at-folio-models/link";

import { RequestStatus } from "../../../enums/requestStatus";
import { UserStatus } from "../../../enums/userStatus";

export const useFetchLinksEffect = (): void => {
  const { profile, userStatus, setProfileTo } = useContext(AppContext),
    { state, setStateTo } = useContext(ProfileManagerPageContext);

  const setStatusTo = (status: RequestStatus): void => {
    setStateTo({ ...state, status });
  }
  
  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        if(userStatus === UserStatus.SignedIn) {          
          if(profile.username !== "" && profile.admin.tutorialComplete) {
            setStatusTo(RequestStatus.Loading);

            const links: ILink[] = await LinkService.getByUID(profile.uid);

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
  }, [userStatus, profile.username]);
}

export const useToggleTutorialEffect = (): void => {
  const { profile } = useContext(AppContext),
    { state, setStateTo } = useContext(ProfileManagerPageContext);

  useEffect(() => {
    if(profile.username !== "" && !profile.admin.tutorialComplete) {
      setStateTo({ ...state, tutorialToggled: true });
    } else if (profile.admin.tutorialComplete) {
      setStateTo({ ...state, tutorialToggled: false });
    }
  }, [profile.username, profile.admin.tutorialComplete]);
}