import { SocialPlatform } from "../../at-folio-enums/socialPlatform";

interface ISocialPlatformUtility {
  getPlatformByName: (platform: string) => SocialPlatform;
  getPlatformImageUrl: (platform: SocialPlatform) => string;
  getPlatforms: () => SocialPlatform[];
  getSLDByPlatform: (platform: SocialPlatform) => string;
}

export const SocialPlatformUtility: ISocialPlatformUtility = {
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
  }
}