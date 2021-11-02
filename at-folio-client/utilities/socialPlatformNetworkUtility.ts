import { ChosenNodeValues, Data, Edge, IdType, Node, Options } from "vis-network/standalone";

import { LinkUtility } from "./linkUtility";
import { UrlUtility } from "./urlUtility";

import { ILink } from "../../at-folio-models/link";
import { IProfile } from "../../at-folio-models/profile";

import { SocialPlatform } from "../../at-folio-enums/socialPlatform";

interface ISocialPlatformNetworkUtility {
  getOptions: () => Options;
  getPlatformByName: (platform: string) => SocialPlatform;
  getPlatformData: (profile: IProfile) => Data;
  getPlatformImageUrl: (platform: SocialPlatform) => string;
  getPlatforms: () => SocialPlatform[];
  getPlatformEdges: (nodes: Node[]) => Edge[];
  getPlatformNodes: (links: ILink[]) => Node[];
  getProfileNode: (image: string) => Node;
  getSLDByPlatform: (platform: SocialPlatform) => string;
  handleOnNodeBlur: (params: any, container: HTMLElement) => void;
  handleOnNodeClick: (params: any, links: ILink[]) => void;
  handleOnNodeHover: (params: any, container: HTMLElement) => void;
}

export const SocialPlatformNetworkUtility: ISocialPlatformNetworkUtility = {
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
        dragNodes: false,
        dragView: false,
        hover: true,
        zoomView: false
      }      
    }
  },
  getPlatformByName: (platform: string): SocialPlatform => {
    switch(platform) {
      case SocialPlatform.Discord:
        return SocialPlatform.Discord;
      case SocialPlatform.Facebook:
        return SocialPlatform.Facebook;
      case SocialPlatform.GitHub:
        return SocialPlatform.GitHub;
      case SocialPlatform.Instagram:
        return SocialPlatform.Instagram;
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
  getPlatformData: (profile: IProfile): Data => {
    const { photo, links } = profile;

    const profileNode: Node = SocialPlatformNetworkUtility.getProfileNode(photo.urls.regular);

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
  getPlatformNodes: (links: ILink[]): Node[] => {
    return links.map((link: ILink) => ({        
      borderWidth: 5,
      color: {
        background: "white",
        border: "white"
      },
      font: {
        color: "white"
      },
      id: link.id,
      image: `img/icons/${link.platform.toLowerCase()}.svg`,
      imagePadding: 20,      
      shape: "circularImage",
      size: 60,
      title: UrlUtility.removeHttpProtocol(link.url),
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
  getSLDByPlatform: (platform: SocialPlatform): string => {
    switch(platform) {
      case SocialPlatform.Discord:
        return "discord.com";

      case SocialPlatform.Facebook:
        return "facebook.com";

      case SocialPlatform.GitHub:
        return "github.com";

      case SocialPlatform.Instagram:
        return "instagram.com";

      case SocialPlatform.Reddit:
        return "reddit.com";

      case SocialPlatform.TikTok:
        return "tiktok.com";

      case SocialPlatform.Twitch:
        return "twitch.tv";

      case SocialPlatform.Twitter:
        return "twitter.com";

      case SocialPlatform.YouTube:
        return "youtube.com";
      default:
        throw new Error(`Unknown platform: ${platform}`);
    }
  },
  handleOnNodeBlur: (params: any, container: HTMLElement): void => {
    if(params.node !== 1) {
      container.style.cursor = "default";
    }
  },
  handleOnNodeClick: (params: any, links: ILink[]): void => {
    const id: string | number = params.nodes[0];
    
    if(id && id !== 1) {
      const link: ILink = LinkUtility.getByID(id as string, links);
      
      window.open(link.url, "_blank").focus();
    }
  },
  handleOnNodeHover: (params: any, container: HTMLElement): void => {
    if(params.node !== 1) {
      container.style.cursor = "pointer";
    }
  }
}