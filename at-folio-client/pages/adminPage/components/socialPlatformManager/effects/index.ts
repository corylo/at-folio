import { useContext, useEffect } from "react";

import { SocialPlatformManagerContext } from "../socialPlatformManager";

import { SocialPlatformService } from "../../../../../services/socialPlatformService";

import { SocialPlatformManagerUtility } from "../utilities/socialPlatformManagerUtility";

import { ISocialPlatform } from "../../../../../../at-folio-models/socialPlatform";

import { RequestStatus } from "../../../../../enums/requestStatus";

export const useFetchSocialPlatformsEffect = (): void => {
  const { state, setStateTo } = useContext(SocialPlatformManagerContext);

  const setStatusTo = (status: RequestStatus): void => {
    setStateTo({ ...state, status });
  }
  
  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        setStatusTo(RequestStatus.Loading);

        const platforms: ISocialPlatform[] = await SocialPlatformService.get();

        setStateTo({ 
          ...state, 
          platforms, 
          status: RequestStatus.Success,
          text: SocialPlatformManagerUtility.formatText(platforms)
        });
      } catch (err) {
        console.error(err);

        setStatusTo(RequestStatus.Error);
      }
    }

    fetch();
  }, []);
}
