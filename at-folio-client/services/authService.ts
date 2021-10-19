import { createUserWithEmailAndPassword, UserCredential } from "@firebase/auth";

import { auth } from "../firebase";

interface IAuthService {
  createUser: (email: string, password: string) => Promise<void>;
}

export const AuthService: IAuthService = {
  createUser: async (email: string, password: string): Promise<void> => {
    await createUserWithEmailAndPassword(auth, email, password);
  }
}