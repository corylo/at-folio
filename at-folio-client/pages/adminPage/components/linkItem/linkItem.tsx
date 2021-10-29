import React, { useState } from "react";

import { IconButton } from "../../../../components/button/iconButton/iconButton";
import { Input } from "../../../../components/input/input";
import { SocialPlatformPicker } from "../../../../components/socialPlatformPicker/socialPlatformPicker";

import { FormMode } from "../../../../enums/formMode";
import { SocialPlatform } from "../../../../../at-folio-enums/socialPlatform";

interface LinkItemProps {
  platform: SocialPlatform;
  url: string;
}

export const LinkItem: React.FC<LinkItemProps> = (props: LinkItemProps) => {
  const [mode, setModeTo] = useState<FormMode>(FormMode.Idle);

  const handleOnPlatformChange = (platform: SocialPlatform): void => {

  }

  const handleOnUrlChange = (url: string): void => {

  }

  const getActions = (): JSX.Element => {
    if(mode === FormMode.Edit) {
      return (
        <React.Fragment>
          <IconButton 
            key={1}
            className="link-item-action"
            icon="fa-regular fa-floppy-disk" 
            label="Save"
            handleOnClick={() => {}} 
          />
          <IconButton 
            key={2}
            className="link-item-action"
            icon="fa-regular fa-xmark" 
            label="Cancel"
            handleOnClick={() => setModeTo(FormMode.Idle)} 
          />
        </React.Fragment>
      )
    } else if (mode === FormMode.Delete) {
      return (
        <React.Fragment>
          <IconButton 
            key={3}
            className="link-item-action icon-delete-button"
            icon="fa-regular fa-trash" 
            label="Confirm"
            handleOnClick={() => {}} 
          />
          <IconButton 
            key={4}
            className="link-item-action"
            icon="fa-regular fa-xmark" 
            label="Cancel"
            handleOnClick={() => setModeTo(FormMode.Idle)} 
          />
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <IconButton 
          key={5}
          className="link-item-action"
          icon="fa-regular fa-pen" 
          label="Edit"
          handleOnClick={() => setModeTo(FormMode.Edit)} 
        />
        <IconButton 
          key={6}
          className="link-item-action icon-delete-button"
          icon="fa-regular fa-trash" 
          label="Delete"
          handleOnClick={() => setModeTo(FormMode.Delete)} 
        />
      </React.Fragment>
    )
  }

  return (
    <div className="link-item">
      <div className="link-item-body">
        <Input label="Platform">
          <SocialPlatformPicker 
            disabled
            selectedPlatform={props.platform} 
            handleOnChange={handleOnPlatformChange} 
          />
        </Input>
        <Input label="Url">
          <input 
            disabled={mode === FormMode.Idle}
            type="text" 
            placeholder="Enter url" 
            value={props.url}
            onChange={(e: any) => handleOnUrlChange(e.target.value)}
          />
        </Input>
      </div>
      <div className="link-item-actions">
        {getActions()}
      </div>
    </div>
  );
}