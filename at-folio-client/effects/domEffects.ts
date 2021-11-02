import { useEffect } from "react";

import { DomUtility } from "../utilities/domUtility";

export const useOnElementBlurEffect = (
  focused: boolean, 
  elementIDs: string[], 
  changed: any[], 
  handleOnBlur: () => void
): void => {
  useEffect(() => {
    if(focused) {      
      const elements: HTMLElement[] = DomUtility.getElementsByID(elementIDs);

      const handleOnClick = (e: any): void => {
        const contained: boolean = DomUtility.didClickOccurWithinElements(e, elements);

        if(!contained) {
          handleOnBlur();
        }
      }

      document.addEventListener("mousedown", handleOnClick);

      return () => document.removeEventListener("mousedown", handleOnClick);
    }
  }, [changed]);
}