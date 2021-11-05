import { doc, getDoc, DocumentReference, DocumentSnapshot } from "@firebase/firestore";

import { db } from "../firebase";

import { ISocialPlatform } from "../../at-folio-models/socialPlatform";
import { ISocialPlatforms, socialPlatformsConverter } from "../../at-folio-models/socialPlatforms";

import { FirestoreCollectionID } from "../../at-folio-enums/firestoreCollectionID";

interface ISocialPlatformService {
  get: () => Promise<ISocialPlatform[]>;
}

export const SocialPlatformService: ISocialPlatformService = {
  get: async (): Promise<ISocialPlatform[]> => {
    const ref: DocumentReference<ISocialPlatforms> = doc(db, FirestoreCollectionID.SocialPlatforms, FirestoreCollectionID.SocialPlatforms)
      .withConverter<ISocialPlatforms>(socialPlatformsConverter);

    const snap: DocumentSnapshot<ISocialPlatforms> = await getDoc(ref);
    
    if(snap.exists()) {
      const data: ISocialPlatforms = snap.data();
      
      return data.platforms;
    }

    return [];
  }
}