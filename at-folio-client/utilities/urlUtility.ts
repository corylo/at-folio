import { StringUtility } from "./stringUtility";

interface IUrlUtility {
  addHttpsProtocol: (url: string) => string;
  finalize: (url: string, sld: string) => string;
  formatSLD: (url: string, sld: string) => string;
  removeHttpProtocol: (url: string) => string;
  removeUnnecessaryParts: (url: string) => string;
  removeWWW: (url: string) => string;
}

export const UrlUtility: IUrlUtility = {
  addHttpsProtocol: (url: string): string => {
    if(url.toLowerCase().indexOf(`https://`) === 0) {
      return url;
    }

    return `https://${UrlUtility.removeHttpProtocol(url)}`;
  },
  finalize: (url: string, sld: string): string => {
    return UrlUtility.formatSLD(UrlUtility.addHttpsProtocol(UrlUtility.removeUnnecessaryParts(url)), sld);
  },
  formatSLD: (url: string, sld: string): string => {
    return StringUtility.replaceCaseInsensitive(url, sld, sld);
  },
  removeHttpProtocol: (url: string): string => {
    if(url.toLowerCase().indexOf("https://") === 0) {
      return StringUtility.replaceCaseInsensitive(url, "https://", "");
    } else if (url.toLowerCase().indexOf("http://") === 0) {
      return StringUtility.replaceCaseInsensitive(url, "http://", "");
    }

    return url;
  },
  removeUnnecessaryParts: (url: string): string => {
    return UrlUtility.removeHttpProtocol(UrlUtility.removeWWW(url));
  },
  removeWWW: (url: string): string => {
    if(url.toLowerCase().indexOf("www.") >= 0) {
      return StringUtility.replaceCaseInsensitive(url, "www.", "");
    }

    return url;
  }
}