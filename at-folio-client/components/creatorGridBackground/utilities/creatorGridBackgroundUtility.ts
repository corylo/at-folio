import React from "react";

import { NumberUtility } from "../../../utilities/numberUtility";

import { ICreatorGridBackgroundState } from "../models/creatorGridBackgroundState";
import { IPosition } from "../../../models/position";
import { ISize } from "../../../models/size";
import { ITileDimensions } from "../models/tileDimensions";

interface ICreatorGridBackgroundUtility {
  getGridStyles: (state: ICreatorGridBackgroundState) => React.CSSProperties;
  getRandomPosition: (currentPosition: IPosition, gridSize: ISize, windowSize: ISize) => IPosition;
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
  getRandomPosition: (currentPosition: IPosition, gridSize: ISize, windowSize: ISize): IPosition => {
    const minPosition: IPosition = {
      x: (gridSize.width - windowSize.width) * -1,
      y: (gridSize.height - windowSize.height) * -1
    }

    const maxPosition: IPosition = {
      x: 15,
      y: 15
    }

    const minIncrement: IPosition = {
      x: windowSize.width / 5,
      y: windowSize.height / 5
    }

    const maxIncrement: IPosition = {
      x: minIncrement.x * 2,
      y: minIncrement.y * 2
    }

    const increment: IPosition = {
      x: NumberUtility.random(minIncrement.x, maxIncrement. x),
      y: NumberUtility.random(minIncrement.y, maxIncrement.y)
    }

    const xSign: number = currentPosition.x + increment.x >= maxPosition.x ? -1 : NumberUtility.randomSign(),
      ySign: number = currentPosition.y + increment.y >= maxPosition.y ? -1 : NumberUtility.randomSign();

    const nextPosition: IPosition = {
      x: currentPosition.x + (increment.x * xSign),
      y: currentPosition.y + (increment.y * ySign)
    }

    const finalizedPosition: IPosition = {
      x: Math.min(Math.max(nextPosition.x, minPosition.x), maxPosition.x),
      y: Math.min(Math.max(nextPosition.y, minPosition.y), maxPosition.y)
    }

    return finalizedPosition;
  },
  getTileDimensions: (): ITileDimensions => {
    // w: 1000, h: 2000 = 0.5 - portrait
    // w: 2000, h: 1000 = 2 - landscape

    const ratio: number = window.innerWidth / window.innerHeight;

    const size: ISize = {
      height: 30,
      width: 45
    }

    if(ratio <= 1) { // Portrait
      return {
        size,
        unit: "vh"
      }
    } else { // Landscape
      return {
        size,
        unit: "vw"
      }
    }
  }
}