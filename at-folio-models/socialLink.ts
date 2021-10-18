import { SocialPlatform } from "../at-folio-enums/socialPlatform";

export interface ISocialLink {
  platform: SocialPlatform;
  url: string;
}