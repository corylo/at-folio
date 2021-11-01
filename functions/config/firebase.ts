import { initializeApp } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { config } from "firebase-functions";

import { atFolioProductionAppConfig } from "../../config/firebase";

const getConfig = (): any => {
  if (config().env.value === "production") {
    return atFolioProductionAppConfig;
  }
  
  return atFolioProductionAppConfig;
};

initializeApp(getConfig());

export const admin: Firestore = getFirestore();