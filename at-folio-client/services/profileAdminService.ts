import { doc, getDoc, updateDoc, DocumentReference, DocumentSnapshot } from "@firebase/firestore";

import { db } from "../firebase";

import { IProfileAdmin, IProfileAdminUpdate, profileAdminConverter } from "../../at-folio-models/profileAdmin";

import { FirestoreCollectionID } from "../../at-folio-enums/firestoreCollectionID";

interface IProfileAdminService {
  getByUID: (uid: string) => Promise<IProfileAdmin>;
  update: (uid: string, update: IProfileAdminUpdate) => Promise<void>;
}

export const ProfileAdminService: IProfileAdminService = {
  getByUID: async (uid: string): Promise<IProfileAdmin> => {
    const ref: DocumentReference<IProfileAdmin> = doc(db, FirestoreCollectionID.Profiles, uid, FirestoreCollectionID.Admin, FirestoreCollectionID.Admin)
      .withConverter<IProfileAdmin>(profileAdminConverter);

    const snap: DocumentSnapshot<IProfileAdmin> = await getDoc(ref);
    
    if(snap.exists()) {
      return snap.data();
    }

    return null;
  },
  update: async (uid: string, update: IProfileAdminUpdate): Promise<void> => {
    const ref: DocumentReference<IProfileAdmin> = doc(db, FirestoreCollectionID.Profiles, uid, FirestoreCollectionID.Admin, FirestoreCollectionID.Admin)
      .withConverter<IProfileAdmin>(profileAdminConverter);

    await updateDoc(ref, update);
  }
}