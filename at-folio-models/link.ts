import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "@firebase/firestore";

import { SocialPlatform } from "../at-folio-enums/socialPlatform";

export interface ILink {
  id: string;
  label: string;
  platform: SocialPlatform;
  url: string;
}

export interface ILinkUpdate {
  label?: string;
  platform?: SocialPlatform;
  url?: string;
}

export const linkConverter: FirestoreDataConverter<ILink> = {
  toFirestore(link: ILink): DocumentData {
    return {
      label: link.label,
      platform: link.platform,
      url: link.url
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<ILink>): ILink {
    const data: ILink = snapshot.data();

    return {
      id: snapshot.id,
      label: data.label,
      platform: data.platform,
      url: data.url
    }
  }
}