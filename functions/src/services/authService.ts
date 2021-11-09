import { auth, logger } from "firebase-functions";
import { DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot, Transaction } from "firebase-admin/firestore";

import { admin } from "../../config/firebase";

import { linkConverter } from "../../../at-folio-models/link";
import { IProfile, profileConverter } from "../../../at-folio-models/profile";

import { FirestoreCollectionID } from "../../../at-folio-enums/firestoreCollectionID";

interface IAuthService {
  onDeleteUser: (user: auth.UserRecord) => Promise<void>;
}

export const AuthService: IAuthService = {
  onDeleteUser: async (user: auth.UserRecord): Promise<void> => {
    try {
      await admin.runTransaction(async (transaction: Transaction) => {
        const profile: DocumentSnapshot<IProfile> = await transaction.get(
          admin.collection(FirestoreCollectionID.Profiles)
            .doc(user.uid)
            .withConverter<IProfile>(profileConverter)
        );

        const links: QuerySnapshot = await transaction.get(
          admin.collection(FirestoreCollectionID.Profiles)
            .doc(user.uid)
            .collection(FirestoreCollectionID.Links)
            .withConverter(linkConverter)
        );

        transaction.delete(profile.ref);

        transaction.delete(
          admin.collection(FirestoreCollectionID.Profiles)
            .doc(user.uid)
            .collection(FirestoreCollectionID.Admin)
            .doc(FirestoreCollectionID.Admin)
        );

        links.docs.forEach((doc: QueryDocumentSnapshot) => transaction.delete(doc.ref));

        transaction.delete(
          admin.collection(FirestoreCollectionID.Usernames)
            .doc(profile.data().username)
        );
      });      
    } catch (err) {
      logger.error(err);
    }
  }
}