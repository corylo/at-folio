import React, { useEffect, useRef, useState } from "react";
import _debounce from "lodash.debounce";

import { DefaultPhotoService } from "../../services/defaultPhotoService";

import { CreatorGridBackgroundUtility } from "./utilities/creatorGridBackgroundUtility";
import { SocialPlatformUtility } from "../../utilities/socialPlatformUtility";

import { defaultCreatorGridBackgroundState, ICreatorGridBackgroundState } from "./models/creatorGridBackgroundState";
import { IPosition } from "../../models/position";
import { ISize } from "../../models/size";
import { IUnsplashPhoto } from "../../../at-folio-models/unsplashPhoto";

import { DefaultPhotoType } from "../../../at-folio-enums/defaultPhotoType";
import { SocialPlatform } from "../../../at-folio-enums/socialPlatform";

import { RequestStatus } from "../../enums/requestStatus";

export const CreatorGridBackground: React.FC = () => {
  const ref: React.MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const [state, setStateTo] = useState<ICreatorGridBackgroundState>(defaultCreatorGridBackgroundState(
    CreatorGridBackgroundUtility.getTileDimensions(),
    5000,    
  ));

  const setIntervalTo = (interval: number): void => {
    setStateTo({ ...state, interval });
  }

  const setPositionTo = (position: IPosition): void => {    
    setStateTo({ ...state, position });
  }

  const getRandomPosition = (): IPosition => {
    const { clientHeight: height, clientWidth: width } = ref.current;

    const gridSize: ISize = { height, width };

    const windowSize: ISize = { 
      height: window.innerHeight, 
      width: window.innerWidth 
    };

    return CreatorGridBackgroundUtility.getRandomPosition(state.position, gridSize, windowSize);
  }

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        const photos: IUnsplashPhoto[] = await DefaultPhotoService.getByType(DefaultPhotoType.Background);
        
        if(ref.current) {
          setStateTo({ 
            ...state, 
            photos, 
            position: getRandomPosition(), 
            status: RequestStatus.Success 
          });
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetch();
  }, []);

  useEffect(() => {
    if(ref.current && state.status === RequestStatus.Success) {
      setPositionTo(getRandomPosition());
    }
  }, [state.status]);

  useEffect(() => {    
    if(ref.current && state.status === RequestStatus.Success) {
      const timeout: NodeJS.Timeout = setTimeout(() => {
        setPositionTo(getRandomPosition());
      }, state.interval + 2000);

      return () => {
        clearTimeout(timeout);
      }
    }
  }, [state.interval, state.position, state.status]);

  useEffect(() => {    
    if(ref.current && state.status === RequestStatus.Success) {
      const handleOnResize = (): void => {
        setStateTo({
          ...state,
          dimensions: CreatorGridBackgroundUtility.getTileDimensions(),
          position: getRandomPosition(),
          window: { height: window.innerHeight, width: window.innerWidth },          
        });
      }

      const debouncedResize = _debounce(handleOnResize, 250);
  
      window.addEventListener("resize", debouncedResize);
  
      return () => {
        window.removeEventListener("resize", debouncedResize);
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
    if(state.status === RequestStatus.Success) {
      const platforms: SocialPlatform[] = SocialPlatformUtility.getPlatforms(),
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
              style={{ backgroundImage: `url(${SocialPlatformUtility.getPlatformImageUrl(platforms[i])})` }} 
            />
          </div>
        )
      }

      return tiles;
    }

    return [];
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