import React, {  useState } from "react";

import { WrappableComponent } from "../wrappableComponent/wrappableComponent";

import { IPosition } from "../../models/position";

interface SvgBackgroundProps {
  wrapperID?: string;
}

export const SvgBackground: React.FC<SvgBackgroundProps> = (props: SvgBackgroundProps) => {  
  const point: IPosition = { x: 70, y: 50 };

  const [path] = useState<string>(`
    M 0,0
    L 100,0
    C 70,20 90,40 ${point.x},${point.y}
    C 20,70 60,90 0,100
    Z
  `);

  return (
    <WrappableComponent wrapperID={props.wrapperID}>
      <svg 
        className="svg-background"
        height="100%" 
        width="100%" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >        
        <path fill="rgb(40, 40, 40)" d={path} vectorEffect="non-scaling-stroke" /> 
      </svg>
    </WrappableComponent>
  );
}