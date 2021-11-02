import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { Form } from "../../../../components/form/form";
import { FormActions } from "../../../../components/form/formActions";
import { FormBody } from "../../../../components/form/formBody";
import { IconButton } from "../../../../components/button/iconButton/iconButton";
import { Input } from "../../../../components/input/input";
import { SocialPlatformPicker } from "../../../../components/socialPlatformPicker/socialPlatformPicker";

import { LinkFormValidator } from "./validators/linkFormValidator";

import { FormUtility } from "../../../../utilities/formUtility";
import { UrlUtility } from "../../../../utilities/urlUtility";

import { IFormAction } from "../../../../models/formAction";
import { defaultLinkFormState, ILinkFormState } from "./models/linkFormState";
import { ILink } from "../../../../../at-folio-models/link";

import { FormError } from "../../../../enums/formError";
import { FormMode } from "../../../../enums/formMode";
import { RequestStatus } from "../../../../enums/requestStatus";
import { SocialPlatform } from "../../../../../at-folio-enums/socialPlatform";

interface LinkFormProps {
  id?: string;
  className?: string;
  link?: ILink;
  mode: FormMode;
  actions: IFormAction[];
}

export const LinkForm: React.FC<LinkFormProps> = (props: LinkFormProps) => {  
  const [state, setState] = useState<ILinkFormState>(defaultLinkFormState(props.link));

  const { errors, fields } = state;

  const disabled: boolean = props.mode !== FormMode.Create && props.mode !== FormMode.Update;

  const setValueTo = (key: string, value: string): void => {
    setState({ ...state, fields: { ...fields, [key]: value } });
  }

  useEffect(() => {
    if(fields.platform === SocialPlatform.None) {
      setValueTo("url", "");
    }
  }, [fields.platform]);

  useEffect(() => {
    if(props.link) {
      setState({ 
        ...state, 
        fields: { 
          platform: props.link.platform, 
          url: props.link.url 
        },
        status: RequestStatus.Idle
      });
    }
  }, [props.link]);

  const handleOnSave = async (): Promise<void> => {
    const updates: ILinkFormState = LinkFormValidator.validate(state);

    if(FormUtility.determineIfValid(updates) && state.status !== RequestStatus.Loading) {
      try {
        setState({ ...updates, status: RequestStatus.Loading });

        const link: ILink = { 
          platform: fields.platform, 
          url: UrlUtility.finalize(fields.url),
          id: props.link ? props.link.id : ""
        }

        if(props.mode === FormMode.Create) {
          await FormUtility.getActionByID("Confirm Add", props.actions).handleOnClick(link);

          setState(defaultLinkFormState());
        } else if (props.mode === FormMode.Update) {
          await FormUtility.getActionByID("Confirm Update", props.actions).handleOnClick(link);
        }
      } catch (err) {
        console.error(err);
        
        setState({ ...updates, status: RequestStatus.Error });
      }
    } else {      
      setState(updates);
    }
  }

  const handleOnDelete = async (): Promise<void> => {    
    setState({ ...state, status: RequestStatus.Loading });

    await FormUtility.getActionByID("Confirm Delete", props.actions).handleOnClick();
  }

  const handleOnCancel = (): void => {
    setState(defaultLinkFormState(props.link));

    FormUtility.getActionByID(props.mode === FormMode.Update ? "Cancel Update" : "Cancel Delete", props.actions).handleOnClick();
  }

  const handleOnKeyDown = (e: any): void => {
    if(e.key === "Enter") {
      handleOnSave();
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
            disabled={disabled}
            placeholder="Enter url" 
            value={fields.url}
            onChange={(e: any) => setValueTo("url", e.target.value)}
            onKeyDown={handleOnKeyDown}
          />
        </Input>
      )
    }
  }

  const getActions = (): JSX.Element[] => {
    const getHandleOnClick = (action: IFormAction): (...args: any[]) => void => {
      if(action.id === "Confirm Add" || action.id === "Confirm Update") {
        return handleOnSave;
      } else if (action.id === "Cancel Update" || action.id === "Cancel Delete") {
        return handleOnCancel;
      } else if (action.id === "Confirm Delete") {
        return handleOnDelete;
      }

      return action.handleOnClick;
    }

    return props.actions.map((action: IFormAction) => (
      <IconButton
        key={action.id}
        className="link-form-action"
        icon={action.icon}
        label={action.label}
        status={action.id.includes("Confirm") ? state.status : null}
        handleOnClick={getHandleOnClick(action)}
      />
    ))
  }

  return (
    <Form id={props.id} className={classNames("link-form", props.className)}>
      <FormBody errorMessage={state.errorMessage} status={state.status}>
        <Input label="Platform" error={errors.platform}>
          <SocialPlatformPicker 
            disabled={disabled}
            selectedPlatform={fields.platform} 
            handleOnChange={(platform: SocialPlatform) => setValueTo("platform", platform)} 
          />
        </Input>
        {getUrlField()}
      </FormBody>
      <FormActions status={state.status}>
        {getActions()}
      </FormActions>        
    </Form>
  );
}