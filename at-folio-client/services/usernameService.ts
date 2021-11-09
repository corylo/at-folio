import { doc, getDoc, DocumentReference, DocumentSnapshot } from "@firebase/firestore";

import { db } from "../firebase";

import { IUsername, usernameConverter } from "../../at-folio-models/username";

import { FirestoreCollectionID } from "../../at-folio-enums/firestoreCollectionID";

interface IUsernameService {
  get: (username: string) => Promise<IUsername>;
}

export const UsernameService: IUsernameService = {
  get: async (username: string): Promise<IUsername> => {
    const ref: DocumentReference<IUsername> = doc(db, FirestoreCollectionID.Usernames, username)
      .withConverter<IUsername>(usernameConverter);

    const snap: DocumentSnapshot<IUsername> = await getDoc(ref);
    
    if(snap.exists()) {
      return snap.data();
    }

    return null;
  }
}