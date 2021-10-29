import React, { useContext, useState } from "react";
import classNames from "classnames";

import { LinkForm } from "../linkForm/linkForm";

import { AppContext } from "../../../../components/app/appWrapper";

import { LinkService } from "../../../../services/linkService";

import { LinkUtility } from "../../../../utilities/linkUtility";

import { IFormAction } from "../../../../models/formAction";
import { ILink } from "../../../../../at-folio-models/link";

import { FormMode } from "../../../../enums/formMode";

interface UpdateLinkFormProps {
  link: ILink;
}

export const UpdateLinkForm: React.FC<UpdateLinkFormProps> = (props: UpdateLinkFormProps) => {
  const { profile, setProfileTo } = useContext(AppContext);

  const [mode, setModeTo] = useState<FormMode>(FormMode.Idle);

  const updateLink = async (link: ILink): Promise<void> => {
    try {
      await LinkService.update(profile.uid, link);

      setProfileTo({ links: LinkUtility.updateLink(link, profile.links) });

      setModeTo(FormMode.Idle);
    } catch (err) {
      console.error(err);
    }
  }

  const deleteLink = async (): Promise<void> => {
    try {
      await LinkService.delete(profile.uid, props.link.id);

      setProfileTo({ links: LinkUtility.removeLink(props.link.id, profile.links) });
    } catch (err) {
      console.error(err);
    }
  }

  const getActions = (): IFormAction[] => {
    if(mode === FormMode.Update) {
      return [{
        label: "Confirm",
        icon: "fa-regular fa-floppy-disk",
        id: "Confirm Update",
        handleOnClick: updateLink
      }, {        
        label: "Cancel",
        icon: "fa-regular fa-xmark",
        id: "Cancel Update",
        handleOnClick: () => setModeTo(FormMode.Idle) 
      }];
    } else if (mode === FormMode.Delete) {
      return [{
        label: "Confirm",
        icon: "fa-regular fa-trash",
        id: "Confirm Delete",
        handleOnClick: deleteLink
      }, {        
        label: "Cancel",
        icon: "fa-regular fa-xmark",
        id: "Cancel Delete",
        handleOnClick: () => setModeTo(FormMode.Idle) 
      }];
    }

    return [{
      label: "Update",
      icon: "fa-regular fa-pen",
      id: "Update",
      handleOnClick: () => setModeTo(FormMode.Update)
    }, {
      label: "Delete",
      icon: "fa-regular fa-trash",
      id: "Delete",
      handleOnClick: () => setModeTo(FormMode.Delete) 
    }]
  }

  return (    
    <LinkForm 
      className={classNames("update-link-form", mode.toLowerCase())}
      link={props.link} 
      mode={mode}
      actions={getActions()} 
    />
  );
}