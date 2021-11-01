import React, { useEffect, useRef, useState } from "react";

import { DefaultPhotoService } from "../../services/defaultPhotoService";

import { CreatorGridBackgroundUtility } from "./utilities/creatorGridBackgroundUtility";
import { SocialPlatformNetworkUtility } from "../../utilities/socialPlatformNetworkUtility";

import { defaultCreatorGridBackgroundState, ICreatorGridBackgroundState } from "./models/creatorGridBackgroundState";
import { IPosition } from "../../models/position";
import { IUnsplashPhoto } from "../../../at-folio-models/unsplashPhoto";

import { DefaultPhotoType } from "../../../at-folio-enums/defaultPhotoType";
import { SocialPlatform } from "../../../at-folio-enums/socialPlatform";

import { RequestStatus } from "../../enums/requestStatus";

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
    const fetch = async (): Promise<void> => {
      try {
        const photos: IUnsplashPhoto[] = await DefaultPhotoService.getByType(DefaultPhotoType.Background);

        setState({ ...state, photos, status: RequestStatus.Success });
      } catch (err) {
        console.error(err);
      }
    }

    fetch();
  }, []);

  useEffect(() => {    
    if(ref.current && state.status === RequestStatus.Success) {
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
  }, [state.status, state.interval, state.window]);

  useEffect(() => {
    if(state.status === RequestStatus.Success) {
      setIntervalTo(1000);

      const timeout: NodeJS.Timeout = setTimeout(() => setIntervalTo(5000), 1000);

      return () => {
        clearTimeout(timeout);
      }
    }
  }, [state.status, state.window]);

  const getTiles = (): JSX.Element[] => {
    const platforms: SocialPlatform[] = SocialPlatformNetworkUtility.getPlatforms(),
      backgrounds: IUnsplashPhoto[] = state.photos.slice(0, 9);

    let tiles: JSX.Element[] = [];

    const { size, unit } = state.dimensions;

    for(let i: number = 0; i < backgrounds.length; i++) {
      const styles: React.CSSProperties = {
        height: `${size.height}${unit}`,
        width: `${size.width}${unit}`
      }

      tiles.push(
        <div key={`background-${i}`} className="creator-tile background" style={styles}>
          <div 
            className="creator-tile-image" 
            style={{ backgroundImage: `url(${backgrounds[i].urls.regular})` }}
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

  if(state.status === RequestStatus.Success) {
    return (
      <div className="creator-grid-background">
        <div ref={ref} className="creator-grid-tiles" style={styles}>
          {getTiles()}
        </div>
      </div>
    );
  }

  return null;
}