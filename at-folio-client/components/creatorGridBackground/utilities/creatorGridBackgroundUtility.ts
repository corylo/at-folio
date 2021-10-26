import React from "react";

import { NumberUtility } from "../../../utilities/numberUtility";

import { ICreatorGridBackgroundState } from "../models/creatorGridBackgroundState";
import { IPosition } from "../../../models/position";
import { ISize } from "../../../models/size";
import { ITileDimensions } from "../models/tileDimensions";

interface ICreatorGridBackgroundUtility {
  getGridStyles: (state: ICreatorGridBackgroundState) => React.CSSProperties;
  getRandomPosition: (height: number, width: number) => IPosition;
  getTileDimensions: () => ITileDimensions;
}

export const CreatorGridBackgroundUtility: ICreatorGridBackgroundUtility = {
  getGridStyles: (state: ICreatorGridBackgroundState): React.CSSProperties => {
    const { size, unit } = state.dimensions;

    return {
      left: `${state.position.x}px`,
      top: `${state.position.y}px`,      
      transition: `left ${state.interval}ms, top ${state.interval}ms`,
      width: `calc(${state.columns * size.width}${unit} + ${state.columns - 1}em)`
    }
  },
  getRandomPosition: (height: number, width: number): IPosition => {
    const x: number = NumberUtility.random(0, width) * -1,
      y: number = NumberUtility.random(0, height) * -1;

    return { x, y };
  },
  getTileDimensions: (): ITileDimensions => {
    const size: ISize = {
      height: 30,
      width: 45
    }

    let unit: string = "vw";

    if(window.innerWidth < 1600) {
      unit = "vh";
    }
    
    return {
      size,
      unit
    }
  }
}