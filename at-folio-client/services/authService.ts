import { applyActionCode, checkActionCode, confirmPasswordReset, createUserWithEmailAndPassword, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, verifyPasswordResetCode, UserCredential, EmailAuthProvider } from "@firebase/auth";

import { auth } from "../firebase";

interface IAuthService {
  applyActionCode: (code: string) => Promise<void>;
  checkActionCode: (code: string) => Promise<void>;
  confirmPasswordReset: (code: string, password: string) => Promise<void>;
  createUser: (email: string, password: string) => Promise<void>;
  reauthenticate: (email: string, password: string) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  sendResetEmail: (email: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  verifyPasswordResetCode: (code: string) => Promise<void>;
}

export const AuthService: IAuthService = {
  applyActionCode: async (code: string): Promise<void> => {
    await applyActionCode(auth, code);
  },
  checkActionCode: async (code: string): Promise<void> => {
    await checkActionCode(auth, code);
  },
  confirmPasswordReset: async (code: string, password: string): Promise<void> => {
    await confirmPasswordReset(auth, code, password);
  },
  createUser: async (email: string, password: string): Promise<void> => {
    const credentials: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

    await sendEmailVerification(credentials.user);
  },
  reauthenticate: async (email: string, password: string): Promise<void> => {
    await reauthenticateWithCredential(auth.currentUser, EmailAuthProvider.credential(email, password));
  },
  sendEmailVerification: async (): Promise<void> => {
    await sendEmailVerification(auth.currentUser);
  },
  sendResetEmail: async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
  },
  signIn: async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  },
  signOut: async (): Promise<void> => {
    await signOut(auth);
  },
  updateEmail: async (email: string): Promise<void> => {
    await updateEmail(auth.currentUser, email);

    await sendEmailVerification(auth.currentUser);
  },
  updatePassword: async (password: string): Promise<void> => {
    await updatePassword(auth.currentUser, password);
  },
  verifyPasswordResetCode: async (code: string): Promise<void> => {
    await verifyPasswordResetCode(auth, code);
  }
}