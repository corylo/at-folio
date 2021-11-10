import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";

import { Form } from "../../../../components/form/form";
import { FormActions } from "../../../../components/form/formActions";
import { FormBody } from "../../../../components/form/formBody";
import { IconButton } from "../../../../components/button/iconButton/iconButton";
import { Input } from "../../../../components/input/input";
import { SocialPlatformPicker } from "../../../../components/socialPlatformPicker/socialPlatformPicker";

import { AppContext } from "../../../../components/app/appWrapper";

import { LinkFormValidator } from "./validators/linkFormValidator";

import { FormUtility } from "../../../../utilities/formUtility";
import { SocialPlatformUtility } from "../../../../utilities/socialPlatformUtility";
import { UrlUtility } from "../../../../utilities/urlUtility";

import { IFormAction } from "../../../../models/formAction";
import { ILink } from "../../../../../at-folio-models/link";
import { defaultLinkFormState, ILinkFormState } from "./models/linkFormState";

import { FormError } from "../../../../enums/formError";
import { FormMode } from "../../../../enums/formMode";
import { RequestStatus } from "../../../../enums/requestStatus";

interface LinkFormProps {
  id?: string;
  className?: string;
  link?: ILink;
  mode: FormMode;
  actions: IFormAction[];
}

export const LinkForm: React.FC<LinkFormProps> = (props: LinkFormProps) => {  
  const { platforms } = useContext(AppContext);

  const [state, setStateTo] = useState<ILinkFormState>(defaultLinkFormState(props.link));

  const { errors, fields } = state;

  const disabled: boolean = props.mode !== FormMode.Create && props.mode !== FormMode.Update;

  const setValueTo = (key: string, value: string): void => {
    setStateTo({ ...state, fields: { ...fields, [key]: value } });
  }

  useEffect(() => {
    if(fields.platform === "") {
      setValueTo("url", "");
    }
  }, [fields.platform]);

  useEffect(() => {
    if(props.link) {
      setStateTo({ 
        ...state, 
        fields: { 
          label: props.link.label,
          platform: props.link.platform, 
          url: props.link.url 
        },
        status: RequestStatus.Idle
      });
    }
  }, [props.link]);

  const getPlatformUrl = (platform: string): string => {
    return UrlUtility.addHttpsProtocol(SocialPlatformUtility.getUrlByPlatform(platform, platforms));
  }

  const handleOnSave = async (): Promise<void> => {
    const updates: ILinkFormState = LinkFormValidator.validate(state, platforms);

    if(FormUtility.determineIfValid(updates) && state.status !== RequestStatus.Loading) {
      try {
        setStateTo({ ...updates, status: RequestStatus.Loading });

        const link: ILink = { 
          label: fields.label,
          platform: fields.platform, 
          url: UrlUtility.finalize(fields.url, getPlatformUrl(fields.platform)),
          id: props.link ? props.link.id : ""
        }

        if(props.mode === FormMode.Create) {
          await FormUtility.getActionByID("Confirm Add", props.actions).handleOnClick(link);

          setStateTo(defaultLinkFormState());
        } else if (props.mode === FormMode.Update) {
          await FormUtility.getActionByID("Confirm Update", props.actions).handleOnClick(link);
        }
      } catch (err) {
        console.error(err);
        
        setStateTo({ ...updates, status: RequestStatus.Error });
      }
    } else {      
      setStateTo(updates);
    }
  }

  const handleOnDelete = async (): Promise<void> => {    
    setStateTo({ ...state, status: RequestStatus.Loading });

    await FormUtility.getActionByID("Confirm Delete", props.actions).handleOnClick();
  }

  const handleOnCancel = (): void => {
    setStateTo(defaultLinkFormState(props.link));

    FormUtility.getActionByID(props.mode === FormMode.Update ? "Cancel Update" : "Cancel Delete", props.actions).handleOnClick();
  }

  const handleOnKeyDown = (e: any): void => {
    if(e.key === "Enter") {
      handleOnSave();
    }
  }

  const getRemainingFields = (): JSX.Element => {
    if(fields.platform !== "") {
      const getLabelInput = (): JSX.Element => {
        if(!disabled || props.link.label) {
          return (
            <Input label="Label (Optional)" value={fields.label} maxLength={30} error={errors.label}>
              <input 
                type="text" 
                disabled={disabled}
                maxLength={30}
                placeholder="Enter label" 
                value={fields.label}
                onChange={(e: any) => setValueTo("label", e.target.value)}
                onKeyDown={handleOnKeyDown}
              />
            </Input>
          )
        }
      }

      const getUrlErrorMessage = (): string => {
        if(errors.url === FormError.InvalidValue) {
          return `Please enter a valid ${fields.platform} url.`;
        }
      }

      return (      
        <React.Fragment>
          <Input label="Url" error={errors.url} errorMessage={getUrlErrorMessage()}>
            <input 
              type="text" 
              disabled={disabled}
              placeholder={getPlatformUrl(fields.platform)} 
              value={fields.url}
              onChange={(e: any) => setValueTo("url", e.target.value)}
              onKeyDown={handleOnKeyDown}
            />
          </Input>
          {getLabelInput()}
        </React.Fragment>  
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
            handleOnChange={(platform: string) => setValueTo("platform", platform)} 
          />
        </Input>
        {getRemainingFields()}
      </FormBody>
      <FormActions status={state.status}>
        {getActions()}
      </FormActions>        
    </Form>
  );
}