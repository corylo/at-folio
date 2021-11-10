import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, CollectionReference, DocumentReference, Query, QueryDocumentSnapshot, QuerySnapshot } from "@firebase/firestore";
import _orderby from "lodash.orderby";

import { db } from "../firebase";

import { ILink, ILinkUpdate, linkConverter } from "../../at-folio-models/link";

import { FirestoreCollectionID } from "../../at-folio-enums/firestoreCollectionID";

interface ILinkService {
  create: (uid: string, link: ILink) => Promise<string>;
  delete: (uid: string, linkID: string) => Promise<void>;
  getByUID: (uid: string) => Promise<ILink[]>;
  update: (uid: string, id: string, update: ILinkUpdate) => Promise<void>;
}

export const LinkService: ILinkService = {
  create: async (uid: string, link: ILink): Promise<string> => {    
    const ref: CollectionReference<ILink> = collection(db, FirestoreCollectionID.Profiles, uid, FirestoreCollectionID.Links)
      .withConverter<ILink>(linkConverter);

    const doc: DocumentReference<ILink> = await addDoc(ref, link);

    return doc.id;
  },
  delete: async (uid: string, linkID: string): Promise<void> => {
    const ref: DocumentReference = doc(db, FirestoreCollectionID.Profiles, uid, FirestoreCollectionID.Links, linkID);

    await deleteDoc(ref);
  },
  getByUID: async (uid: string): Promise<ILink[]> => {
    const query: Query<ILink> = collection(db, FirestoreCollectionID.Profiles, uid, FirestoreCollectionID.Links)
      .withConverter<ILink>(linkConverter);

    const snap: QuerySnapshot<ILink> = await getDocs(query),
      links: ILink[] = snap.docs.map((doc: QueryDocumentSnapshot<ILink>) => doc.data());

    return _orderby(links, "platform");
  },
  update: async (uid: string, id: string, update: ILinkUpdate): Promise<void> => {
    const ref: DocumentReference = doc(db, FirestoreCollectionID.Profiles, uid, FirestoreCollectionID.Links, id);

    await updateDoc(ref, { ...update });
  }
}