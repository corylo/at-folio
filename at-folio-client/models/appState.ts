import { UserStatus } from "../enums/userStatus";

export interface IAppState {
  userStatus: UserStatus;
}

export const defaultAppState = (): IAppState => ({
  userStatus: UserStatus.Loading
})