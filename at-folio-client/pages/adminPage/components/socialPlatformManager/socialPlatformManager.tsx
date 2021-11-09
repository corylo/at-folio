import React, { createContext, useState } from "react";

import { SocialPlatformManagerComponent } from "./socialPlatformManagerComponent";

import { ISocialPlatformManagerContext } from "./models/socialPlatformManagerContext";
import { defaultSocialPlatformManagerState, ISocialPlatformManagerState } from "./models/socialPlatformManagerState";

export const SocialPlatformManagerContext = createContext<ISocialPlatformManagerContext>(null);

export const SocialPlatformManager: React.FC = () => {  
  const [state, setStateTo] = useState<ISocialPlatformManagerState>(defaultSocialPlatformManagerState());

  return (
    <SocialPlatformManagerContext.Provider value={{ state, setStateTo }}>
      <SocialPlatformManagerComponent />
    </SocialPlatformManagerContext.Provider>
  )
}