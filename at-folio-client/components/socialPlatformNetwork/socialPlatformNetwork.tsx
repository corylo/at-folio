import React, { useEffect } from "react";
import { Data, Network, Options } from "vis-network/standalone";

import { SocialPlatformNetworkUtility } from "../../utilities/socialPlatformNetworkUtility";

import { IProfile } from "../../../at-folio-models/profile";

interface SocialPlatformNetworkProps {
  id: string;
  profile: IProfile;
}

export const SocialPlatformNetwork: React.FC<SocialPlatformNetworkProps> = (props: SocialPlatformNetworkProps) => {
  const { profile } = props;

  useEffect(() => {
    const container: HTMLElement | null = document.getElementById(props.id);

    if(container) {
      const data: Data = SocialPlatformNetworkUtility.getPlatformData(profile),
        options: Options = SocialPlatformNetworkUtility.getOptions();

      if(profile.links.length > 0) {
        options.interaction.dragNodes = true;
      }

      const network: Network = new Network(container, data, options);

      network.on("hoverNode", (params: any) => SocialPlatformNetworkUtility.handleOnNodeHover(params, container));

      network.on("blurNode", (params: any) => SocialPlatformNetworkUtility.handleOnNodeBlur(params, container));

      network.on("click", (params: any) => SocialPlatformNetworkUtility.handleOnNodeClick(params, profile.links));

      const handleOnResize = (): void => {
        network.fit();
      }

      window.addEventListener("resize", handleOnResize);

      return () => {
        window.removeEventListener("resize", handleOnResize);
      }
    }
  }, [profile.photo, profile.links]);

  return(
    <div id={props.id} className="social-platform-network" />
  )
}