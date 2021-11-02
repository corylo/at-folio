import { UrlUtility } from "../utilities/urlUtility";

interface IUrlValidator {
  validate: (url: string) => boolean;
  validateSLD: (url: string, sld: string) => boolean;
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
  validateSLD: (url: string, sld: string): boolean => {
    return UrlUtility
      .removeUnnecessaryParts(url)
      .toLowerCase()
      .indexOf(sld) === 0;
  }
}