import { ILink } from "../../at-folio-models/link";

interface ILinkUtility {
  getByID: (id: string, links: ILink[]) => ILink;
}

export const LinkUtility: ILinkUtility = {
  getByID: (id: string, links: ILink[]): ILink => {
    return links.find((link: ILink) => link.id === id);
  }
}