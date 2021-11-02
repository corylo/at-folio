import AlgoliaLite, { SearchClient, SearchIndex } from "algoliasearch/lite";

import { AlgoliaUtility } from "../utilities/algoliaUtility";

import { FirestoreCollectionID } from "../../at-folio-enums/firestoreCollectionID";

const Algolia: SearchClient = AlgoliaLite("84NKRIQUWZ", "b1086508b76bb82c139ec9b4f5b6d1cd"),
  ProfileIndex: SearchIndex = Algolia.initIndex(FirestoreCollectionID.Profiles);

interface IAlgoliaService {
  search: (query: string) => Promise<any[]>;
}

export const AlgoliaService: IAlgoliaService = {
  search: async (query: string): Promise<any[]> => {
    const res: any = await ProfileIndex.search(query, { hitsPerPage: 5 });

    return AlgoliaUtility.mapResults(FirestoreCollectionID.Profiles, res.hits);
  }
}