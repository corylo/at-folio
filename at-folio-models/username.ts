import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "@firebase/firestore";

export interface IUsername {
  id: string;
  uid: string;  
}

export const defaultUsername = (): IUsername => ({    
  id: "",
  uid: ""
});

export const usernameConverter: FirestoreDataConverter<IUsername> = {
  toFirestore(username: IUsername): DocumentData {
    return {      
      uid: username.uid
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<IUsername>): IUsername {
    const data: IUsername = snapshot.data();

    return {
      id: snapshot.id,
      uid: data.uid
    }
  }
}