import { FirebaseAuthMode } from "../enums/firebaseAuthMode";

interface IFirebaseAuthUtility {
  getMode: (mode: string) => FirebaseAuthMode;
}

export const FirebaseAuthUtility: IFirebaseAuthUtility = {
  getMode: (mode: string): FirebaseAuthMode => {
    switch(mode) {
      case FirebaseAuthMode.RecoverEmail:
        return FirebaseAuthMode.RecoverEmail;
        
      case FirebaseAuthMode.ResetPassword:
        return FirebaseAuthMode.ResetPassword;
        
      case FirebaseAuthMode.VerifyEmail:
        return FirebaseAuthMode.VerifyEmail;

      default:
        return FirebaseAuthMode.Invalid;
    }
  }
}