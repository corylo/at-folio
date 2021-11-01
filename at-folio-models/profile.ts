import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "@firebase/firestore";

import { ILink } from "./link";
import { defaultUnsplashPhotoReference, IUnsplashPhotoReference } from "./unsplashPhotoReference";

export interface IProfile {
  background: IUnsplashPhotoReference;
  links: ILink[];
  photo: IUnsplashPhotoReference;
  uid: string;
  username: string;
}

export interface IProfileUpdate {
  background?: IUnsplashPhotoReference;
  links?: ILink[];
  photo?: IUnsplashPhotoReference;
  uid?: string;
  username?: string;
}

export const defaultProfile = (): IProfile => ({
  background: defaultUnsplashPhotoReference(),
  links: [],
  photo: defaultUnsplashPhotoReference(),
  uid: "",
  username: ""
});

export const profileConverter: FirestoreDataConverter<IProfile> = {
  toFirestore(profile: IProfile): DocumentData {
    return {
      background: profile.background,
      photo: profile.photo,
      username: profile.username
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<IProfile>): IProfile {
    const data: IProfile = snapshot.data();

    return {
      background: data.background,
      links: [],
      photo: data.photo,
      uid: snapshot.id,
      username: data.username
    }
  }
}