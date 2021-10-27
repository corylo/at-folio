import React, { useEffect } from "react";
import { Data, Network, Options } from "vis-network/standalone";

import { SocialPlatformNetworkUtility } from "../../utilities/socialPlatformNetworkUtility";

import { ILink } from "../../../at-folio-models/link";

interface SocialPlatformNetworkProps {
  id: string;
  links: ILink[];
  profileImage: string;
}

export const SocialPlatformNetwork: React.FC<SocialPlatformNetworkProps> = (props: SocialPlatformNetworkProps) => {
  useEffect(() => {
    const container: HTMLElement | null = document.getElementById(props.id);

    if(container) {
      const data: Data = SocialPlatformNetworkUtility.getPlatformData(props.profileImage, props.links),
        options: Options = SocialPlatformNetworkUtility.getOptions();

      const network: Network = new Network(container, data, options);

      network.on("hoverNode", (params: any) => SocialPlatformNetworkUtility.handleOnNodeHover(params, container));

      network.on("blurNode", (params: any) => SocialPlatformNetworkUtility.handleOnNodeBlur(params, container));

      network.on("click", (params: any) => SocialPlatformNetworkUtility.handleOnNodeClick(params, props.links));

      const handleOnResize = (): void => {
        network.fit();
      }

      window.addEventListener("resize", handleOnResize);

      return () => {
        window.removeEventListener("resize", handleOnResize);
      }
    }
  }, []);

  return(
    <div id={props.id} className="social-platform-network" />
  )
}