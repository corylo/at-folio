import { User } from "@firebase/auth";

import { UserStatus } from "../enums/userStatus";

export interface IAppToggles {
  mainMenu: boolean;
}

export interface IAppTogglesUpdate {
  mainMenu?: boolean;
}

export const defaultAppToggles = (): IAppToggles => ({
  mainMenu: false
});

export interface IAppState {
  toggles: IAppToggles;
  user: User;
  userStatus: UserStatus;
}

export const defaultAppState = (): IAppState => ({
  toggles: defaultAppToggles(),
  user: null,
  userStatus: UserStatus.Loading
})