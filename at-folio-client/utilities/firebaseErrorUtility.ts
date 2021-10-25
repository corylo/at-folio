import { FirebaseErrorCode } from "../enums/firebaseErrorCode";

interface IFirebaseErrorUtility {
  getAuthErrorMessage: (code: FirebaseErrorCode) => string;
}

export const FirebaseErrorUtility: IFirebaseErrorUtility = {
  getAuthErrorMessage: (code: FirebaseErrorCode): string => {
    switch(code) {
      case FirebaseErrorCode.UserNotFound:
      case FirebaseErrorCode.WrongPassword:
        return "Invalid email / password";
      case FirebaseErrorCode.TooManyRequests:
        return "Account has been temporarily disabled. Please reset your password or try again later.";
      default:
        return "";
    }
  }
}