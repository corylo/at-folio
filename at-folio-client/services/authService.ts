import { createUserWithEmailAndPassword, sendEmailVerification, UserCredential } from "@firebase/auth";

import { auth } from "../firebase";

interface IAuthService {
  createUser: (email: string, password: string) => Promise<void>;
}

export const AuthService: IAuthService = {
  createUser: async (email: string, password: string): Promise<void> => {
    const credentials: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

    await sendEmailVerification(credentials.user);
  }
}