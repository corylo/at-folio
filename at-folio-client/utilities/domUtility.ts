interface IDomUtility {
  didClickOccurWithinElements: (e: any, elements: HTMLElement[]) => boolean;
  getElementsByID: (ids: string[]) => HTMLElement[];
}

export const DomUtility: IDomUtility = {
  didClickOccurWithinElements: (e: any, elements: HTMLElement[]): boolean => {
    let count: number = 0;

    for(let element of elements) {
      if(element.contains(e.target)) {
        count++;
      }
    }

    return count > 0;
  },
  getElementsByID: (ids: string[]): HTMLElement[] => {
    let elements: HTMLElement[] = [];

    for(let id of ids) {
      const element: HTMLElement | null = document.getElementById(id);

      if(element) {
        elements.push(element);
      }
    }

    return elements;
  }
}