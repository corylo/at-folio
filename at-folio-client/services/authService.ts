import { confirmPasswordReset, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, UserCredential, verifyPasswordResetCode } from "@firebase/auth";

import { auth } from "../firebase";

interface IAuthService {
  confirmPasswordReset: (code: string, password: string) => Promise<void>;
  createUser: (email: string, password: string) => Promise<void>;
  sendResetEmail: (email: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  verifyPasswordResetCode: (code: string) => Promise<void>;
}

export const AuthService: IAuthService = {
  confirmPasswordReset: async (code: string, password: string): Promise<void> => {
    await confirmPasswordReset(auth, code, password);
  },
  createUser: async (email: string, password: string): Promise<void> => {
    const credentials: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

    await sendEmailVerification(credentials.user);
  },
  sendResetEmail: async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
  },
  signIn: async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  },
  signOut: async (): Promise<void> => {
    await auth.signOut();
  },
  verifyPasswordResetCode: async (code: string): Promise<void> => {
    await verifyPasswordResetCode(auth, code);
  }
}