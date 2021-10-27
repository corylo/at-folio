import { collection, getDocs, Query, QueryDocumentSnapshot, QuerySnapshot } from "@firebase/firestore";

import { db } from "../firebase";

import { ILink, linkConverter } from "../../at-folio-models/link";

interface ILinkService {
  getByUsername: (username: string) => Promise<ILink[]>;
}

export const LinkService: ILinkService = {
  getByUsername: async (username: string): Promise<ILink[]> => {
    const query: Query<ILink> = collection(db, "profiles", username, "links")
      .withConverter<ILink>(linkConverter);

    const snap: QuerySnapshot<ILink> = await getDocs(query);

    return snap.docs.map((doc: QueryDocumentSnapshot<ILink>) => doc.data());
  }
}