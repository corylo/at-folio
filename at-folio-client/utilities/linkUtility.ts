import { ILink } from "../../at-folio-models/link";

interface ILinkUtility {
  getByID: (id: string, links: ILink[]) => ILink;
  removeLink: (id: string, links: ILink[]) => ILink[];
  updateLink: (update: ILink, links: ILink[]) => ILink[];
}

export const LinkUtility: ILinkUtility = {
  getByID: (id: string, links: ILink[]): ILink => {
    return links.find((link: ILink) => link.id === id);
  },
  removeLink: (id: string, links: ILink[]): ILink[] => {
    return [...links].filter((link: ILink) => link.id !== id);
  },
  updateLink: (update: ILink, links: ILink[]): ILink[] => {
    return [...links].map((link: ILink) => {
      if(link.id === update.id) {
        return update;
      }

      return link;
    });
  }
}