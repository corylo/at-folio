import { ISocialLink } from "./socialLink";

import { ProfileBackgroundImage } from "../at-folio-enums/profileBackgroundImage";

export interface IProfile {
  background: ProfileBackgroundImage;
  links: ISocialLink[];
  pic: string;
  username: string;
}

export const defaultProfile = (): IProfile => ({
  background: ProfileBackgroundImage.Parrots,
  links: [],
  pic: "",
  username: ""
})