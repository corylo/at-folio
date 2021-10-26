import React from "react";

import { SocialPlatformGridBackgroundWave } from "./socialPlatformGridBackgroundWave";

import { NumberUtility } from "../../utilities/numberUtility";
import { SocialPlatformNetworkUtility } from "../../utilities/socialPlatformNetworkUtility";

import { SocialPlatform } from "../../../at-folio-enums/socialPlatform";

interface SocialPlatformGridBackgroundProps {

}

export const SocialPlatformGridBackground: React.FC<SocialPlatformGridBackgroundProps> = (props: SocialPlatformGridBackgroundProps) => {
  const platforms: SocialPlatform[] = SocialPlatformNetworkUtility.getPlatforms();

  const getTiles = (): JSX.Element[] => {
    return [...platforms, ...platforms, ...platforms].map((platform: SocialPlatform, index: number) => {      
      const styles: React.CSSProperties = { 
        animationDelay: `${NumberUtility.random(-1000, -20000)}ms`,
        backgroundImage: `url(${SocialPlatformNetworkUtility.getPlatformImageUrl(platform)})` 
      };

      return (
        <div key={index} className="social-platform-tile" style={styles}/>
      )
    });
  }

  return (
    <div className="social-platform-grid-background">
      <SocialPlatformGridBackgroundWave />
      <div className="social-platform-grid-tiles">
        {getTiles()}
      </div>
    </div>
  );
}