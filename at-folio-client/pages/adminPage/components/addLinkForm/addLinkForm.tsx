import React, { useContext } from "react";

import { LinkForm } from "../linkForm/linkForm";

import { AppContext } from "../../../../components/app/appWrapper";

import { LinkService } from "../../../../services/linkService";

import { IFormAction } from "../../../../models/formAction";
import { ILink } from "../../../../../at-folio-models/link";

import { FormMode } from "../../../../enums/formMode";

export const AddLinkForm: React.FC = () => {
  const { profile, setProfileTo } = useContext(AppContext);

  const addLink = async (link: ILink): Promise<void> => {
    try {
      const id: string = await LinkService.create(profile.uid, link);

      setProfileTo({ links: [...profile.links, { ...link, id }] });
    } catch (err) {
      console.error(err);
    }
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