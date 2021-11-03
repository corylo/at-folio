import React from "react";
import { Link } from "react-router-dom";

import { GettingStartedStep } from "./gettingStartedStep";

export const GettingStarted: React.FC = () => {  
  return (
    <div className="getting-started-wrapper">
      <div className="getting-started">
        <GettingStartedStep>
          1. Select a <span className="highlight">pic</span>.
        </GettingStartedStep>
        <GettingStartedStep>
          2. Select a <span className="highlight">background</span>.
        </GettingStartedStep>
        <GettingStartedStep>
          3. Add your <span className="highlight">links</span>.
        </GettingStartedStep>
        <Link 
          to="/me"
          className="get-started-link link rubik-font" 
        >
          Get started
        </Link>
      </div>
    </div>
  );
}