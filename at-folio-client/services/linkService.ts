import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, CollectionReference, DocumentReference, Query, QueryDocumentSnapshot, QuerySnapshot } from "@firebase/firestore";

import { db } from "../firebase";

import { ILink, linkConverter } from "../../at-folio-models/link";

interface ILinkService {
  create: (uid: string, link: ILink) => Promise<string>;
  delete: (uid: string, linkID: string) => Promise<void>;
  getByUID: (uid: string) => Promise<ILink[]>;
  update: (uid: string, link: ILink) => Promise<void>;
}

export const LinkService: ILinkService = {
  create: async (uid: string, link: ILink): Promise<string> => {    
    const ref: CollectionReference<ILink> = collection(db, "profiles", uid, "links")
      .withConverter<ILink>(linkConverter);

    const doc: DocumentReference<ILink> = await addDoc(ref, link);

    return doc.id;
  },
  delete: async (uid: string, linkID: string): Promise<void> => {
    const ref: DocumentReference = doc(db, "profiles", uid, "links", linkID);

    await deleteDoc(ref);
  },
  getByUID: async (uid: string): Promise<ILink[]> => {
    const query: Query<ILink> = collection(db, "profiles", uid, "links")
      .withConverter<ILink>(linkConverter);

    const snap: QuerySnapshot<ILink> = await getDocs(query);

    return snap.docs.map((doc: QueryDocumentSnapshot<ILink>) => doc.data());
  },
  update: async (uid: string, link: ILink): Promise<void> => {
    const ref: DocumentReference<ILink> = doc(db, "profiles", uid, "links", link.id)
      .withConverter<ILink>(linkConverter);

    await updateDoc(ref, link);
  }
}