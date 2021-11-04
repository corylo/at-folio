import React from "react";
import { Link } from "react-router-dom";

import { GettingStartedStep } from "./gettingStartedStep";

export const GettingStarted: React.FC = () => {  
  return (
    <div className="getting-started-wrapper">
      <div className="getting-started">
        <GettingStartedStep>
          1. Choose a <span className="highlight">username</span>.
        </GettingStartedStep>        
        <GettingStartedStep>
          2. Select your <span className="highlight">pics</span>.
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