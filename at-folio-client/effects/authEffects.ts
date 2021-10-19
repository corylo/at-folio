import { useContext, useEffect } from "react";
import { User } from "@firebase/auth";

import { auth } from "../firebase";

import { AppContext } from "../components/app/appWrapper";

import { UserStatus } from "../enums/userStatus";

export const useOnAuthStateChangedEffect = (): void => {
  const { appState, setAppState } = useContext(AppContext);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user: User) => {
      if(user !== null) {
        setAppState({ ...appState, user, userStatus: UserStatus.SignedIn });
      } else {
        setAppState({ ...appState, user: null, userStatus: UserStatus.SignedOut });
      }
    });

    return () => unsub();
  }, []);
}