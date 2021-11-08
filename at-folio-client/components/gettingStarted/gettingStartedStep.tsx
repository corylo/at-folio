import React from "react";

interface GettingStartedStepProps {
  children: any;
  description?: string;
  index?: number;
}

export const GettingStartedStep: React.FC<GettingStartedStepProps> = (props: GettingStartedStepProps) => {  
  const getIndex = (): JSX.Element => {
    if(props.index) {
      return (
        <h1 className="getting-started-step-index rubik-font">{props.index}</h1>
      )
    }
  }

  const getDescription = (): JSX.Element => {
    if(props.description) {
      return (
        <h1 className="getting-started-step-description rubik-font">{props.description}</h1>
      )
    }
  }

  return (
    <div className="getting-started-step">
      {getIndex()}
      <div className="getting-started-step-content">
        <h1 className="getting-started-step-label rubik-font">
          {props.children}
        </h1>
        {getDescription()}
      </div>
    </div>
  );
}