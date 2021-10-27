import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "@firebase/firestore";

import { ILink } from "./link";

import { ProfileBackgroundImage } from "../at-folio-enums/profileBackgroundImage";

export interface IProfile {
  background: ProfileBackgroundImage;
  links: ILink[];
  image: string;
  uid: string;
  username: string;
}

export interface IProfileUpdate {
  background?: ProfileBackgroundImage;
  links?: ILink[];
  image?: string;
  uid?: string;
  username?: string;
}

export const defaultProfile = (): IProfile => ({
  background: ProfileBackgroundImage.None,
  links: [],
  image: "",
  uid: "",
  username: ""
});

export const profileConverter: FirestoreDataConverter<IProfile> = {
  toFirestore(profile: IProfile): DocumentData {
    return {
      background: profile.background,
      image: profile.image,
      uid: profile.uid
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<IProfile>): IProfile {
    const data: IProfile = snapshot.data();

    return {
      background: data.background,
      links: [],
      image: data.image,
      uid: data.uid,
      username: snapshot.id
    }
  }
}