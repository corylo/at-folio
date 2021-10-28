import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where, DocumentReference, DocumentSnapshot, Query, QuerySnapshot } from "@firebase/firestore";

import { db } from "../firebase";

import { IProfile, IProfileUpdate, profileConverter } from "../../at-folio-models/profile";

interface IProfileService {
  create: (profile: IProfile) => Promise<void>;
  getByUID: (uid: string) => Promise<IProfile>;
  getByUsername: (username: string) => Promise<IProfile>;
  update: (uid: string, update: IProfileUpdate) => Promise<void>;
}

export const ProfileService: IProfileService = {
  create: async (profile: IProfile): Promise<void> => {
    const ref: DocumentReference<IProfile> = doc(db, "profiles", profile.uid)
      .withConverter<IProfile>(profileConverter);

    await setDoc(ref, profile);
  },
  getByUID: async (uid: string): Promise<IProfile> => {
    const ref: DocumentReference<IProfile> = doc(db, "profiles", uid)
      .withConverter<IProfile>(profileConverter);

    const snap: DocumentSnapshot<IProfile> = await getDoc(ref);
    
    if(snap.exists()) {
      return snap.data();
    }

    return null;
  },
  getByUsername: async (username: string): Promise<IProfile> => {
    const q: Query<IProfile> = query(collection(db, "profiles"), where("username", "==", username))
      .withConverter<IProfile>(profileConverter);

    const snap: QuerySnapshot<IProfile> = await getDocs(q);
    
    if(snap.size === 1) {
      return snap.docs[0].data();
    }

    return null;
  },
  update: async (uid: string, update: IProfileUpdate): Promise<void> => {
    const ref: DocumentReference<IProfile> = doc(db, "profiles", uid)
      .withConverter<IProfile>(profileConverter);

    await updateDoc(ref, update);
  }
}