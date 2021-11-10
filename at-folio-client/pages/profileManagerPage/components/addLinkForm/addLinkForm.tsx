import React, { useContext } from "react";
import _orderby from "lodash.orderby";

import { LinkForm } from "../linkForm/linkForm";

import { AppContext } from "../../../../components/app/appWrapper";

import { LinkService } from "../../../../services/linkService";

import { IFormAction } from "../../../../models/formAction";
import { ILink } from "../../../../../at-folio-models/link";

import { FormMode } from "../../../../enums/formMode";

export const AddLinkForm: React.FC = () => {
  const { profile, setProfileTo } = useContext(AppContext);

  const addLink = async (link: ILink): Promise<void> => {
    const id: string = await LinkService.create(profile.uid, link);

    const links: ILink[] = _orderby([...profile.links, { ...link, id }], "platform")

    setProfileTo({ links });
  }

  const getActions = (): IFormAction[] => {
    return [{ 
      label: "Add", 
      icon: "fa-regular fa-plus", 
      id: "Confirm Add",
      handleOnClick: addLink 
    }];
  }
  return (
    <LinkForm id="add-link-form" mode={FormMode.Create} actions={getActions()} />
  );
}