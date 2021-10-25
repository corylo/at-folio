import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, UserCredential } from "@firebase/auth";

import { auth } from "../firebase";

interface IAuthService {
  createUser: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthService: IAuthService = {
  createUser: async (email: string, password: string): Promise<void> => {
    const credentials: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

    await sendEmailVerification(credentials.user);
  },
  signIn: async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  },
  signOut: async (): Promise<void> => {
    await auth.signOut();
  }
}