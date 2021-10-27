import React, { useEffect, useRef, useState } from "react";

import { LoadableImage } from "../loadableImage/loadableImage";

import { CreatorGridBackgroundUtility } from "./utilities/creatorGridBackgroundUtility";
import { ProfileUtility } from "../../utilities/profileUtility";
import { SocialPlatformNetworkUtility } from "../../utilities/socialPlatformNetworkUtility";

import { defaultCreatorGridBackgroundState, ICreatorGridBackgroundState } from "./models/creatorGridBackgroundState";
import { IPosition } from "../../models/position";

import { ImageSize } from "../../enums/imageSize";
import { ProfileBackgroundImage } from "../../../at-folio-enums/profileBackgroundImage";
import { SocialPlatform } from "../../../at-folio-enums/socialPlatform";

export const CreatorGridBackground: React.FC = () => {
  const ref: React.MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<ICreatorGridBackgroundState>(defaultCreatorGridBackgroundState(
    CreatorGridBackgroundUtility.getTileDimensions(),
    5000,    
  ));

  const setIntervalTo = (interval: number): void => {
    setState({ ...state, interval });
  }

  const setRandomPosition = (height: number, width: number): void => {    
    const position: IPosition = CreatorGridBackgroundUtility.getRandomPosition(height - window.innerHeight, width - window.innerWidth);

    setState({ ...state, position });
  }

  useEffect(() => {    
    if(ref.current) {
      const { clientHeight: height, clientWidth: width } = ref.current;

      setRandomPosition(height, width);

      const interval: NodeJS.Timeout = setInterval(() => {
        setRandomPosition(height, width);
      }, state.interval + 2000);

      const handleOnResize = (): void => {
        setState({
          ...state,
          dimensions: CreatorGridBackgroundUtility.getTileDimensions(),
          window: { height: window.innerHeight, width: window.innerWidth },          
        });
      }
  
      window.addEventListener("resize", handleOnResize);
  
      return () => {
        window.removeEventListener("resize", handleOnResize);

        clearInterval(interval);
      }
    }
  }, [state.interval, state.window]);

  useEffect(() => {
    setIntervalTo(1000);

    const timeout: NodeJS.Timeout = setTimeout(() => setIntervalTo(5000), 1000);

    return () => {
      clearTimeout(timeout);
    }
  }, [state.window]);

  const getTiles = (): JSX.Element[] => {
    const platforms: SocialPlatform[] = SocialPlatformNetworkUtility.getPlatforms(),
      backgrounds: ProfileBackgroundImage[] = ProfileUtility.getGridBackgroundImages();

    let tiles: JSX.Element[] = [];

    const { size, unit } = state.dimensions;

    for(let i: number = 0; i < backgrounds.length; i++) {
      const styles: React.CSSProperties = {
        height: `${size.height}${unit}`,
        width: `${size.width}${unit}`
      }

      tiles.push(
        <div key={`background-${i}`} className="creator-tile background" style={styles}>
          <LoadableImage 
            className="creator-tile-image" 
            size={ImageSize.Small}
            source={ProfileUtility.getBackgroundImageUrl(backgrounds[i])} 
          />
        </div>
      );

      tiles.push(
        <div key={`platform-${i}`} className="creator-tile platform" style={styles}>
          <div 
            className="creator-tile-image" 
            style={{ backgroundImage: `url(${SocialPlatformNetworkUtility.getPlatformImageUrl(platforms[i])})` }} 
          />
        </div>
      )
    }

    return tiles;
  }

  const styles: React.CSSProperties = CreatorGridBackgroundUtility.getGridStyles(state);

  return (
    <div className="creator-grid-background">
      <div ref={ref} className="creator-grid-tiles" style={styles}>
        {getTiles()}
      </div>
    </div>
  );
}