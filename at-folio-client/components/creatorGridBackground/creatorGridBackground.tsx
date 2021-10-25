import React from "react";

import { LoadableImage } from "../loadableImage/loadableImage";

import { ProfileUtility } from "../../utilities/profileUtility";

import { ProfileBackgroundImage } from "../../../at-folio-enums/profileBackgroundImage";

interface CreatorGridBackgroundProps {

}

export const CreatorGridBackground: React.FC<CreatorGridBackgroundProps> = (props: CreatorGridBackgroundProps) => {
  const getTiles = (): JSX.Element[] => {
    const backgrounds: ProfileBackgroundImage[] = ProfileUtility.getBackgroundImages();

    return ProfileUtility.getBackgroundImages().map((background: ProfileBackgroundImage, index: number) => {      
      return (
        <div key={index} className="creator-tile">
          <LoadableImage className="creator-tile-image" source={ProfileUtility.getBackgroundImageUrl(background)} />
        </div>
      )
    });
  }

  return (
    <div className="creator-grid-background">
      <div className="creator-grid-tiles">
        {getTiles()}
      </div>
    </div>
  );
}