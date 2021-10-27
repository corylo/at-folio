import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "@firebase/firestore";

import { SocialPlatformNetworkUtility } from "../at-folio-client/utilities/socialPlatformNetworkUtility";

import { SocialPlatform } from "../at-folio-enums/socialPlatform";

export interface ILink {
  platform: SocialPlatform;
  url: string;
}

export const linkConverter: FirestoreDataConverter<ILink> = {
  toFirestore(link: ILink): DocumentData {
    return {
      url: link.url
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<ILink>): ILink {
    const data: ILink = snapshot.data();

    return {
      platform: SocialPlatformNetworkUtility.getPlatformByName(snapshot.id),
      url: data.url
    }
  }
}