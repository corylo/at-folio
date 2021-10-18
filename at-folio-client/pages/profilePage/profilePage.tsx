import React from "react";

import { Page } from "../../components/page/page";
import { ProfileBackground } from "../../components/profileBackground/profileBackground";
import { SocialPlatformNetwork } from "../../components/socialPlatformNetwork/socialPlatformNetwork";

import { SocialPlatformNetworkUtility } from "../../utilities/socialPlatformNetworkUtility";

import { ISocialLink } from "../../../at-folio-models/socialLink";

import { SocialPlatform } from "../../../at-folio-enums/socialPlatform";

export const ProfilePage: React.FC = () => {
  const backgroundImage: string = "/img/backgrounds/mountains.jpg",
    profileImage: string = "/img/profile.png";

  const links: ISocialLink[] = SocialPlatformNetworkUtility.getPlatforms().map((platform: SocialPlatform) => ({
    platform,
    url: "https://google.com"
  }));

  return (
    <Page id="profile-page">
      <SocialPlatformNetwork 
        id="social-platform-network" 
        links={links} 
        profileImage={profileImage}
      />
      <ProfileBackground image={backgroundImage} />
    </Page>
  )
}