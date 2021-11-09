import { doc, getDoc, updateDoc, DocumentReference, DocumentSnapshot } from "@firebase/firestore";
import _orderby from "lodash.orderby";

import { db } from "../firebase";

import { ISocialPlatform } from "../../at-folio-models/socialPlatform";
import { ISocialPlatforms, socialPlatformsConverter } from "../../at-folio-models/socialPlatforms";

import { FirestoreCollectionID } from "../../at-folio-enums/firestoreCollectionID";

interface ISocialPlatformService {
  get: () => Promise<ISocialPlatform[]>;
  update: (platforms: ISocialPlatform[]) => Promise<void>;
}

export const SocialPlatformService: ISocialPlatformService = {
  get: async (): Promise<ISocialPlatform[]> => {
    const ref: DocumentReference<ISocialPlatforms> = doc(db, FirestoreCollectionID.SocialPlatforms, FirestoreCollectionID.SocialPlatforms)
      .withConverter<ISocialPlatforms>(socialPlatformsConverter);

    const snap: DocumentSnapshot<ISocialPlatforms> = await getDoc(ref);
    
    if(snap.exists()) {
      const data: ISocialPlatforms = snap.data();
      
      return _orderby(data.platforms, "name");
    }

    return [];
  },
  update: async (platforms: ISocialPlatform[]): Promise<void> => {
    const ref: DocumentReference = doc(db, FirestoreCollectionID.SocialPlatforms, FirestoreCollectionID.SocialPlatforms);

    await updateDoc(ref, { platforms });
  }
}