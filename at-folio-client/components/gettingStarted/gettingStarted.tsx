import React from "react";

interface GettingStartedProps {
  children: any;
}

export const GettingStarted: React.FC<GettingStartedProps> = (props: GettingStartedProps) => {  
  return (
    <div className="getting-started-wrapper scroll-bar">
      <div className="getting-started">
        {props.children}
      </div>
    </div>
  );
}