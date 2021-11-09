import React, { useContext, useEffect, useState } from "react";

import { Form } from "../../../../../../components/form/form";
import { FormActions } from "../../../../../../components/form/formActions";
import { FormBody } from "../../../../../../components/form/formBody";
import { Input } from "../../../../../../components/input/input";

import { SocialPlatformManagerContext } from "../../socialPlatformManager";

import { SocialPlatformService } from "../../../../../../services/socialPlatformService";

import { SocialPlatformManagerFormValidator } from "./validators/socialPlatformManagerFormValidator";

import { FormUtility } from "../../../../../../utilities/formUtility";
import { SocialPlatformManagerUtility } from "../../utilities/socialPlatformManagerUtility";

import { ISocialPlatform } from "../../../../../../../at-folio-models/socialPlatform";
import { defaultSocialPlatformManagerFormState, ISocialPlatformManagerFormState } from "./models/socialPlatformManagerFormState";

import { RequestStatus } from "../../../../../../enums/requestStatus";

export const SocialPlatformManagerForm: React.FC = () => { 
  const { state: managerState, setStateTo: setManagerStateTo } = useContext(SocialPlatformManagerContext);

  const [state, setStateTo] = useState<ISocialPlatformManagerFormState>(defaultSocialPlatformManagerFormState(managerState.text));

  const { errors, fields } = state;

  const setValueTo = (key: string, value: string): void => {
    setStateTo({ ...state, fields: { ...fields, [key]: value } });
  }

  useEffect(() => {
    setValueTo("text", SocialPlatformManagerUtility.formatText(managerState.platforms));
  }, [managerState.platforms]);

  const update = async (): Promise<void> => {
    const updates: ISocialPlatformManagerFormState = SocialPlatformManagerFormValidator.validate(state);

    if(FormUtility.determineIfValid(updates) && state.status !== RequestStatus.Loading) {
      try {
        setStateTo({ ...updates, status: RequestStatus.Loading });

        const platforms: ISocialPlatform[] = SocialPlatformManagerUtility.formatPlatforms(fields.text);

        await SocialPlatformService.update(platforms);
        
        setStateTo({ ...updates, status: RequestStatus.Success });

        setManagerStateTo({ ...managerState, platforms });
      } catch (err) {
        console.error(err);
        
        setStateTo({ ...updates, status: RequestStatus.Error });
      }
    } else {      
      setStateTo(updates);
    }
  }

  return (
    <Form id="social-platform-manager-form">
      <FormBody errorMessage={state.errorMessage} status={state.status}>
        <Input className="social-platforms-input" label="Platforms" error={errors.text}>
          <textarea 
            className="scroll-bar light"
            value={fields.text}
            onChange={(e: any) => setValueTo("text", e.target.value)} 
          />
        </Input>
      </FormBody>
      <FormActions 
        actions={[{ label: "Update", id: "Update", handleOnClick: update }]}
        status={state.status}      
      />
    </Form>
  )
}