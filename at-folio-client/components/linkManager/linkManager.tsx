import React from "react";

import { AddLinkForm } from "./components/addLinkForm/addLinkForm";
import { LinkItem } from "./components/linkItem/linkItem";

import { ILink } from "../../../at-folio-models/link";

interface LinkManagerProps {
  links: ILink[];
}

export const LinkManager: React.FC<LinkManagerProps> = (props: LinkManagerProps) => {
  const getLinkItems = (): JSX.Element => {
    console.log(props.links)
    if(props.links.length > 0) {
      const links: JSX.Element[] = props.links.map((link: ILink) => (
        <LinkItem key={link.id} platform={link.platform} url={link.url} />
      ));

      return (
        <div className="link-manager-items">
          {links}
        </div>
      );
    }
  }

  return (
    <div className="link-manager">
      <AddLinkForm />
      {getLinkItems()}
    </div>
  );
}