import { ISocialLink } from "./socialLink";

import { ProfileBackgroundImage } from "../at-folio-enums/profileBackgroundImage";

export interface IProfile {
  backgroundImage: ProfileBackgroundImage | string;
  links: ISocialLink[];
  profileImage: string;
  username: string;
}

export const defaultProfile = (): IProfile => ({
  backgroundImage: "",
  links: [],
  profileImage: "",
  username: ""
})