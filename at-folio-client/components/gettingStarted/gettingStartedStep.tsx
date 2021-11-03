import React from "react";

interface GettingStartedStepProps {
  children: any;
}

export const GettingStartedStep: React.FC<GettingStartedStepProps> = (props: GettingStartedStepProps) => {  
  return (
    <h1 className="getting-started-step rubik-font">
      {props.children}
    </h1>
  );
}