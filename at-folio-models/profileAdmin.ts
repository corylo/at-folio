import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "@firebase/firestore";

import { UserRole } from "../at-folio-enums/userRole";

export interface IProfileAdmin {
  id: string;
  roles: UserRole[];
  tutorialComplete: boolean;
}

export interface IProfileAdminUpdate {
  tutorialComplete?: boolean;
}

export const defaultProfileAdmin = (): IProfileAdmin => ({
  id: "",
  roles: [],
  tutorialComplete: false
});

export const profileAdminConverter: FirestoreDataConverter<IProfileAdmin> = {
  toFirestore(admin: IProfileAdmin): DocumentData {
    return {
      roles: admin.roles,
      tutorialComplete: admin.tutorialComplete
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<IProfileAdmin>): IProfileAdmin {
    const data: IProfileAdmin = snapshot.data();

    return {
      id: snapshot.id,
      roles: data.roles,
      tutorialComplete: data.tutorialComplete
    }
  }
}