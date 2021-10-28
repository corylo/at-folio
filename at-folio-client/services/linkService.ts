import { addDoc, collection, getDocs, CollectionReference, Query, QueryDocumentSnapshot, QuerySnapshot } from "@firebase/firestore";

import { db } from "../firebase";

import { ILink, linkConverter } from "../../at-folio-models/link";

interface ILinkService {
  create: (uid: string, link: ILink) => Promise<void>;
  getByUID: (uid: string) => Promise<ILink[]>;
}

export const LinkService: ILinkService = {
  create: async (uid: string, link: ILink): Promise<void> => {    
    const ref: CollectionReference<ILink> = collection(db, "profiles", uid, "links")
      .withConverter<ILink>(linkConverter);

    await addDoc(ref, link);
  },
  getByUID: async (uid: string): Promise<ILink[]> => {
    const query: Query<ILink> = collection(db, "profiles", uid, "links")
      .withConverter<ILink>(linkConverter);

    const snap: QuerySnapshot<ILink> = await getDocs(query);

    return snap.docs.map((doc: QueryDocumentSnapshot<ILink>) => doc.data());
  }
}