import { collection, doc, getDoc, getDocs, query, updateDoc, where, writeBatch, DocumentReference, DocumentSnapshot, Query, QuerySnapshot, WriteBatch } from "@firebase/firestore";

import { db } from "../firebase";

import { IProfile, IProfileUpdate, profileConverter } from "../../at-folio-models/profile";
import { IUsername, usernameConverter } from "../../at-folio-models/username";

import { FirestoreCollectionID } from "../../at-folio-enums/firestoreCollectionID";

interface IProfileService {
  create: (profile: IProfile) => Promise<void>;
  getByUID: (uid: string) => Promise<IProfile>;
  getByUsername: (username: string) => Promise<IProfile>;
  update: (uid: string, update: IProfileUpdate) => Promise<void>;
}

export const ProfileService: IProfileService = {
  create: async (profile: IProfile): Promise<void> => {
    const batch: WriteBatch = writeBatch(db);

    const profileRef: DocumentReference<IProfile> = doc(db, FirestoreCollectionID.Profiles, profile.uid)
      .withConverter<IProfile>(profileConverter);

    batch.set(profileRef, profile);

    const usernameRef: DocumentReference<IUsername> = doc(db, FirestoreCollectionID.Usernames, profile.username)
      .withConverter(usernameConverter);

    batch.set(usernameRef, { id: "", uid: profile.uid });

    await batch.commit();
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
    const q: Query<IProfile> = query(collection(db, FirestoreCollectionID.Profiles), where("username", "==", username))
      .withConverter<IProfile>(profileConverter);

    const snap: QuerySnapshot<IProfile> = await getDocs(q);
    
    if(snap.size === 1) {
      return snap.docs[0].data();
    }

    return null;
  },
  update: async (uid: string, update: IProfileUpdate): Promise<void> => {
    const ref: DocumentReference<IProfile> = doc(db, FirestoreCollectionID.Profiles, uid)
      .withConverter<IProfile>(profileConverter);

    await updateDoc(ref, update);
  }
}