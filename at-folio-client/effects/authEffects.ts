import { useContext, useEffect } from "react";
import { User } from "@firebase/auth";

import { auth } from "../firebase";

import { AppContext } from "../components/app/appWrapper";

import { ProfileAdminService } from "../services/profileAdminService";
import { ProfileService } from "../services/profileService";
import { SocialPlatformService } from "../services/socialPlatformService";

import { IAppState } from "../models/appState";
import { IProfile } from "../../at-folio-models/profile";
import { IProfileAdmin } from "../../at-folio-models/profileAdmin";

import { UserStatus } from "../enums/userStatus";

export const useOnAuthStateChangedEffect = (): void => {
  const { appState, setAppStateTo } = useContext(AppContext);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user: User) => {
      const state: IAppState = {
        ...appState,
      }

      if(state.platforms.length === 0) {
        state.platforms = await SocialPlatformService.get();
      }

      if(user !== null) {
        state.user = user;
        state.userStatus = UserStatus.SignedIn;

        const profile: IProfile = await ProfileService.getByUID(user.uid);

        if(profile) {
          const admin: IProfileAdmin = await ProfileAdminService.getByUID(user.uid);

          profile.admin = admin;

          state.profile = profile;
        }

        setAppStateTo(state);
      } else {
        state.user = null;
        state.userStatus = UserStatus.SignedOut;
      }
      
      setAppStateTo(state);
    });

    return () => unsub();
  }, []);
}