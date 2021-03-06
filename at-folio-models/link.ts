import { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";

export interface ILink {
  id: string;
  label: string;
  platform: string;
  url: string;
}

export interface ILinkUpdate {
  label?: string;
  platform?: string;
  url?: string;
}

export const linkConverter: any = {
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