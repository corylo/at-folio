import { User } from "@firebase/auth";

import { UserStatus } from "../enums/userStatus";

export interface IAppState {
  user: User;
  userStatus: UserStatus;
}

export const defaultAppState = (): IAppState => ({
  user: null,
  userStatus: UserStatus.Loading
})