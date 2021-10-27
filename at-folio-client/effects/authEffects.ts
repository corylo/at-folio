import { useContext, useEffect } from "react";
import { User } from "@firebase/auth";

import { auth } from "../firebase";

import { AppContext } from "../components/app/appWrapper";

import { ProfileService } from "../services/profileService";

import { IAppState } from "../models/appState";
import { IProfile } from "../../at-folio-models/profile";

import { UserStatus } from "../enums/userStatus";

export const useOnAuthStateChangedEffect = (): void => {
  const { appState, setAppStateTo } = useContext(AppContext);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user: User) => {
      if(user !== null) {
        const state: IAppState = {
          ...appState,
          user, 
          userStatus: UserStatus.SignedIn 
        }

        const profile: IProfile = await ProfileService.getByUID(user.uid);

        if(profile) {
          state.profile = profile;
        }

        setAppStateTo(state);
      } else {
        setAppStateTo({ ...appState, user: null, userStatus: UserStatus.SignedOut });
      }
    });

    return () => unsub();
  }, []);
}