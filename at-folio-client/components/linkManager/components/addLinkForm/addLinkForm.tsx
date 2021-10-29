import React, { useContext, useEffect, useState } from "react";

import { Form } from "../../../../components/form/form";
import { FormActions } from "../../../../components/form/formActions";
import { FormBody } from "../../../../components/form/formBody";
import { Input } from "../../../../components/input/input";
import { SocialPlatformPicker } from "../../../socialPlatformPicker/socialPlatformPicker";

import { AppContext } from "../../../../components/app/appWrapper";

import { LinkService } from "../../../../services/linkService";

import { AddLinkFormValidator } from "./validators/addLinkFormValidator";

import { FormUtility } from "../../../../utilities/formUtility";

import { defaultAddLinkFormState, IAddLinkFormState } from "./models/addLinkFormState";
import { ILink } from "../../../../../at-folio-models/link";

import { FormError } from "../../../../enums/formError";
import { RequestStatus } from "../../../../enums/requestStatus";
import { SocialPlatform } from "../../../../../at-folio-enums/socialPlatform";
import { UrlUtility } from "../../../../utilities/urlUtility";

export const AddLinkForm: React.FC = () => {
  const { profile, setProfileTo } = useContext(AppContext);

  const [state, setState] = useState<IAddLinkFormState>(defaultAddLinkFormState());

  const { errors, fields } = state;

  const setValueTo = (key: string, value: string): void => {
    setState({ ...state, fields: { ...fields, [key]: value } });
  }

  useEffect(() => {
    if(fields.platform === SocialPlatform.None) {
      setValueTo("url", "");
    }
  }, [fields.platform]);

  const add = async (): Promise<void> => {
    const updates: IAddLinkFormState = AddLinkFormValidator.validate(state);

    if(FormUtility.determineIfValid(updates) && state.status !== RequestStatus.Loading) {
      try {
        setState({ ...updates, status: RequestStatus.Loading });

        const link: ILink = { 
          platform: fields.platform, 
          url: UrlUtility.finalize(fields.url),
          id: ""
        }

        await LinkService.create(profile.uid, link);

        setProfileTo({ links: [...profile.links, link] });

        setState(defaultAddLinkFormState());
      } catch (err) {
        console.error(err);
        
        setState({ ...updates, status: RequestStatus.Error });
      }
    } else {      
      setState(updates);
    }
  }

  const handleOnKeyDown = (e: any): void => {
    if(e.key === "Enter") {
      add();
    }
  }

  const getUrlField = (): JSX.Element => {
    if(fields.platform !== SocialPlatform.None) {
      const getUrlErrorMessage = (): string => {
        if(errors.url === FormError.InvalidValue) {
          return `Please enter a valid ${fields.platform} url.`;
        }
      }

      return (        
        <Input label="Url" error={errors.url} errorMessage={getUrlErrorMessage()}>
          <input 
            type="text" 
            placeholder="Enter url" 
            value={fields.url}
            onChange={(e: any) => setValueTo("url", e.target.value)}
            onKeyDown={handleOnKeyDown}
          />
        </Input>
      )
    }
  }

  return (
    <Form id="add-link-form">
      <FormBody errorMessage={state.errorMessage} status={state.status}>
        <Input label="Platform" error={errors.platform}>
          <SocialPlatformPicker 
            selectedPlatform={fields.platform} 
            handleOnChange={(platform: SocialPlatform) => setValueTo("platform", platform)} 
          />
        </Input>
        {getUrlField()}
      </FormBody>
      <FormActions 
        actions={[{ label: "Create", handleOnClick: add }]} 
        status={state.status} 
      />
    </Form>
  );
}