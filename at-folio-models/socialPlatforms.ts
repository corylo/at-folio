import { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";

import { ISocialPlatform } from "./socialPlatform";

export interface ISocialPlatforms {
  id: string;
  platforms: ISocialPlatform[];
}

export const socialPlatformsConverter: any = {
  toFirestore(group: ISocialPlatforms): DocumentData {
    return {
      platforms: group.platforms
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<ISocialPlatforms>): ISocialPlatforms {
    const data: ISocialPlatforms = snapshot.data();

    return {
      id: snapshot.id,
      platforms: data.platforms
    }
  }
}