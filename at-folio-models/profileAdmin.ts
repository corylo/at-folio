import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "@firebase/firestore";

export interface IProfileAdmin {
  id: string;
  tutorialComplete: boolean;
}

export const defaultProfileAdmin = (): IProfileAdmin => ({
  id: "",
  tutorialComplete: false
});

export const profileAdminConverter: FirestoreDataConverter<IProfileAdmin> = {
  toFirestore(admin: IProfileAdmin): DocumentData {
    return {
      tutorialComplete: admin.tutorialComplete
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<IProfileAdmin>): IProfileAdmin {
    const data: IProfileAdmin = snapshot.data();

    return {
      id: snapshot.id,
      tutorialComplete: data.tutorialComplete
    }
  }
}