import { IProfileSearchResult } from "../../at-folio-models/profileSearchResult";
import { FirestoreCollectionID } from "../../at-folio-enums/firestoreCollectionID";

interface IAlgoliaUtility {
  mapResults: (id: FirestoreCollectionID, results: any[]) => IProfileSearchResult[];
}

export const AlgoliaUtility: IAlgoliaUtility = {
  mapResults: (id: FirestoreCollectionID, results: any[]): IProfileSearchResult[] => {
    switch(id) {
      case FirestoreCollectionID.Profiles:
        return results.map((result: any) => ({
          uid: result.objectID,
          username: result.username
        }));
      default:
        throw new Error(`Unknown firestore collection ID: ${id}`);
    }
  }
}