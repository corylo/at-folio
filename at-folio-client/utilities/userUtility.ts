import { IProfile } from "../../at-folio-models/profile";

import { UserRole } from "../../at-folio-enums/userRole";
import { UserStatus } from "../enums/userStatus";

interface IUserUtility {
  isAdmin: (profile: IProfile) => boolean;
  isSignedOutOrNotAdmin: (profile: IProfile, userStatus: UserStatus) => boolean;
}

export const UserUtility: IUserUtility = {
  isAdmin: (profile: IProfile): boolean => {
    return profile.admin.roles.includes(UserRole.Admin);
  },
  isSignedOutOrNotAdmin: (profile: IProfile, userStatus: UserStatus): boolean => {
    if(userStatus === UserStatus.SignedOut) {
      return true;
    } else if (userStatus === UserStatus.SignedIn) {
      return !UserUtility.isAdmin(profile);
    }
    
    return false;
  }
}