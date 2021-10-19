import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "@firebase/analytics";
import { Firestore, getFirestore } from "@firebase/firestore";
import { Auth, getAuth } from "@firebase/auth";

import { atFolioProductionAppConfig } from "../config/firebase";

const getConfig = (): any => {
  if (process.env.NODE_ENV === "production") {
    return atFolioProductionAppConfig;
  }
  
  return atFolioProductionAppConfig;
};

initializeApp(getConfig());

export const analytics: Analytics = getAnalytics();
export const db: Firestore = getFirestore();
export const auth: Auth = getAuth();