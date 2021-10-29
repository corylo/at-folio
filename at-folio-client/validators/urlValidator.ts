import { UrlUtility } from "../utilities/urlUtility";

interface IUrlValidator {
  validate: (url: string) => boolean;
  validateSLD: (sld: string, url: string) => boolean;
}

export const UrlValidator: IUrlValidator = {
  validate: (url: string): boolean => {
    const validatableUrl: string = UrlUtility.removeUnnecessaryParts(url);

    try {
      new URL(`https://${validatableUrl}`);

      return true;
    } catch(err) {
      return false;
    }
  },  
  validateSLD: (sld: string, url: string): boolean => {
    return UrlUtility.removeUnnecessaryParts(url).indexOf(sld) === 0;
  }
}