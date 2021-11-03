import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "@firebase/firestore";

import { ILink } from "./link";
import { defaultProfileAdmin, IProfileAdmin } from "./profileAdmin";
import { defaultUnsplashPhotoReference, IUnsplashPhotoReference } from "./unsplashPhotoReference";

export interface IProfile {
  admin: IProfileAdmin;
  background: IUnsplashPhotoReference;
  links: ILink[];
  photo: IUnsplashPhotoReference;
  uid: string;
  username: string;
}

export interface IProfileUpdate {
  admin?: IProfileAdmin;
  background?: IUnsplashPhotoReference;
  links?: ILink[];
  photo?: IUnsplashPhotoReference;
  uid?: string;
  username?: string;
}

export const defaultProfile = (): IProfile => ({
  admin: defaultProfileAdmin(),
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
      admin: defaultProfileAdmin(),
      background: data.background,
      links: [],
      photo: data.photo,
      uid: snapshot.id,
      username: data.username
    }
  }
}