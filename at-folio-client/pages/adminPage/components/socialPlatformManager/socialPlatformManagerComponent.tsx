import React, { useContext } from "react";

import { AdminPageSection } from "../adminPageSection/adminPageSection";
import { SocialPlatformManagerForm } from "./components/socialPlatformManagerForm/socialPlatformManagerForm";

import { SocialPlatformManagerContext } from "./socialPlatformManager";

import { useFetchSocialPlatformsEffect } from "./effects";

export const SocialPlatformManagerComponent: React.FC = () => {  
  const { state } = useContext(SocialPlatformManagerContext);

  useFetchSocialPlatformsEffect();

  return (
    <AdminPageSection id="social-platform-manager" status={state.status} title="Social Platforms">
      <SocialPlatformManagerForm />
    </AdminPageSection>
  )
}