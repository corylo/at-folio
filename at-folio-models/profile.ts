import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "@firebase/firestore";

import { ILink } from "./link";

import { ProfileImageOption } from "../at-folio-enums/profileImageOption";

export interface IProfile {
  background: ProfileImageOption;
  links: ILink[];
  image: ProfileImageOption;
  uid: string;
  username: string;
}

export interface IProfileUpdate {
  background?: ProfileImageOption;
  links?: ILink[];
  image?: ProfileImageOption;
  uid?: string;
  username?: string;
}

export const defaultProfile = (): IProfile => ({
  background: ProfileImageOption.None,
  links: [],
  image: ProfileImageOption.None,
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