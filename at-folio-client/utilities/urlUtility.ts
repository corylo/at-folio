interface IUrlUtility {
  addHttpsProtocol: (url: string) => string;
  finalize: (url: string) => string;
  removeHttpProtocol: (url: string) => string;
  removeUnnecessaryParts: (url: string) => string;
  removeWWW: (url: string) => string;
}

export const UrlUtility: IUrlUtility = {
  addHttpsProtocol: (url: string): string => {
    if(url.indexOf(`https://`) === 0) {
      return url;
    }

    return `https://${UrlUtility.removeHttpProtocol(url)}`;
  },
  finalize: (url: string): string => {
    return UrlUtility.addHttpsProtocol(UrlUtility.removeUnnecessaryParts(url));
  },
  removeHttpProtocol: (url: string): string => {
    if(url.indexOf("https://") === 0) {
      return url.replace("https://", "");
    } else if (url.indexOf("http://") === 0) {
      return url.replace("http://", "");
    }

    return url;
  },
  removeUnnecessaryParts: (url: string): string => {
    return UrlUtility.removeHttpProtocol(UrlUtility.removeWWW(url));
  },
  removeWWW: (url: string): string => {
    if(url.indexOf("www.") >= 0) {
      return url.replace("www.", "");
    }

    return url;
  }
}