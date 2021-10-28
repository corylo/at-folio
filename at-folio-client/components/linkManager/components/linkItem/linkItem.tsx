import React from "react";

import { Input } from "../../../input/input";
import { SocialPlatformPicker } from "../../../socialPlatformPicker/socialPlatformPicker";

import { SocialPlatform } from "../../../../../at-folio-enums/socialPlatform";

interface LinkItemProps {
  platform: SocialPlatform;
  url: string;
}

export const LinkItem: React.FC<LinkItemProps> = (props: LinkItemProps) => {
  return (
    <div className="link-item">
      <Input label="Platform">
        <SocialPlatformPicker 
          selectedPlatform={props.platform} 
          handleOnChange={(platform: SocialPlatform) => {}} 
        />
      </Input>
      <Input label="Url">
        <input 
          type="text" 
          placeholder="Enter url" 
          value={props.url}
          onChange={(e: any) => {}}
        />
      </Input>
    </div>
  );
}