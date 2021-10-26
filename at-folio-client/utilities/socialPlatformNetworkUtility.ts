import { ChosenNodeValues, Data, Edge, IdType, Node, Options } from "vis-network/standalone";

import { ISocialLink } from "../../at-folio-models/socialLink";

import { SocialPlatform } from "../../at-folio-enums/socialPlatform";

interface ISocialPlatformNetworkUtility {
  getLinkByPlatform: (platform: SocialPlatform, links: ISocialLink[]) => ISocialLink;
  getOptions: () => Options;
  getPlatformByName: (platform: string) => SocialPlatform;
  getPlatformData: (profileImage: string, links: ISocialLink[]) => Data;
  getPlatformImageUrl: (platform: SocialPlatform) => string;
  getPlatforms: () => SocialPlatform[];
  getPlatformEdges: (nodes: Node[]) => Edge[];
  getPlatformNodes: (links: ISocialLink[]) => Node[];
  getProfileNode: (image: string) => Node;
  handleOnNodeBlur: (params: any, container: HTMLElement) => void;
  handleOnNodeClick: (params: any, links: ISocialLink[]) => void;
  handleOnNodeHover: (params: any, container: HTMLElement) => void;
}

export const SocialPlatformNetworkUtility: ISocialPlatformNetworkUtility = {
  getLinkByPlatform: (platform: SocialPlatform, links: ISocialLink[]): ISocialLink => {
    return links.find((link: ISocialLink) => link.platform === platform);
  },
  getOptions: (): Options => {
    return {
      nodes: {    
        shadow: {
          color: "rgba(40, 40, 40, 0.25)"
        },
        size: 30
      },
      edges: {
        color: "transparent",
        length: 20
      },
      physics: {
        barnesHut: {
          gravitationalConstant: -20000
        }
      },
      interaction: {
        dragView: false,
        hover: true,
        zoomView: false
      }      
    }
  },
  getPlatformByName: (platform: string): SocialPlatform => {
    switch(platform) {
      case SocialPlatform.Facebook:
        return SocialPlatform.Facebook;
      case SocialPlatform.Reddit:
        return SocialPlatform.Reddit;
      case SocialPlatform.TikTok:
        return SocialPlatform.TikTok;
      case SocialPlatform.Twitch:
        return SocialPlatform.Twitch;
      case SocialPlatform.Twitter:
        return SocialPlatform.Twitter;
      case SocialPlatform.YouTube:
        return SocialPlatform.YouTube;
      default:
        throw new Error(`Unknown platform: ${platform}`);
    }
  },
  getPlatformData: (profileImage: string, links: ISocialLink[]): Data => {
    const profileNode: Node = SocialPlatformNetworkUtility.getProfileNode(profileImage);

    const nodes: Node[] = SocialPlatformNetworkUtility.getPlatformNodes(links),
      edges: Edge[] = SocialPlatformNetworkUtility.getPlatformEdges(nodes);

    return {
      nodes: [
        profileNode,
        ...nodes
      ],
      edges
    }
  },
  getPlatformImageUrl: (platform: SocialPlatform): string => {
    return `img/icons/${platform.toLowerCase()}.svg`;
  },
  getPlatforms: (): SocialPlatform[] => {
    return [
      SocialPlatform.Discord,
      SocialPlatform.Facebook,
      SocialPlatform.GitHub,
      SocialPlatform.Instagram,
      SocialPlatform.Reddit,  
      SocialPlatform.TikTok,      
      SocialPlatform.Twitch,      
      SocialPlatform.Twitter,      
      SocialPlatform.YouTube
    ]
  },
  getPlatformEdges: (nodes: Node[]): Edge[] => {
    return nodes.filter((node: Node) => node.id !== 1)
      .map((node: Node) => ({ 
        from: 1, 
        to: node.id, 
        length: 200
      }));
  },
  getPlatformNodes: (links: ISocialLink[]): Node[] => {
    return links.map((link: ISocialLink) => ({        
      borderWidth: 5,
      color: {
        background: "white",
        border: "white"
      },
      id: link.platform,
      image: `img/icons/${link.platform.toLowerCase()}.svg`,
      imagePadding: 20,
      shape: "circularImage",
      size: 60,
      title: link.platform,
      url: "https://google.com",
      chosen: {
        label: () => {},
        node: (values: ChosenNodeValues, id: IdType, selected: boolean, hovered: boolean) => {
          if(hovered) {
            values.borderWidth = 10;
          }
        }
      }
    }));
  },
  getProfileNode: (image: string): Node => {
    return { 
      id: 1, 
      shape: "circularImage", 
      image,
      size: 140,
      borderWidth: 10,
      color: {
        background: "white",
        border: "white"
      },
      chosen: {
        label: null,
        node: (values: ChosenNodeValues) => {
          values.borderColor = "white";
        }
      }
    };
  },
  handleOnNodeBlur: (params: any, container: HTMLElement): void => {
    if(params.node !== 1) {
      container.style.cursor = "default";
    }
  },
  handleOnNodeClick: (params: any, links: ISocialLink[]): void => {
    const id: string | number = params.nodes[0];
    
    if(id && id !== 1) {
      const platform: SocialPlatform = SocialPlatformNetworkUtility.getPlatformByName(id as string),
        link: ISocialLink = SocialPlatformNetworkUtility.getLinkByPlatform(platform, links);
      
      window.open(link.url, "_blank").focus();
    }
  },
  handleOnNodeHover: (params: any, container: HTMLElement): void => {
    if(params.node !== 1) {
      container.style.cursor = "pointer";
    }
  }
}