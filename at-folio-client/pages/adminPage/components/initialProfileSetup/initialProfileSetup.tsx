import React, { useContext, useState } from "react";

import { Form } from "../../../../components/form/form";
import { FormActions } from "../../../../components/form/formActions";
import { FormBody } from "../../../../components/form/formBody";
import { Input } from "../../../../components/input/input";
import { Modal } from "../../../../components/modal/modal";

import { AppContext } from "../../../../components/app/appWrapper";

import { ProfileService } from "../../../../services/profileService";

import { InitialSetupValidator } from "./validators/initialSetupValidator";

import { FormUtility } from "../../../../utilities/formUtility";

import { defaultInitialSetupState, IInitialSetupState } from "./models/initialSetupState";
import { IProfileUpdate } from "../../../../../at-folio-models/profile";
import { defaultUnsplashPhotoReference } from "../../../../../at-folio-models/unsplashPhotoReference";

import { RequestStatus } from "../../../../enums/requestStatus";

export const InitialProfileSetup: React.FC = () => {
  const { user, setProfileTo } = useContext(AppContext);

  const [state, setStateTo] = useState<IInitialSetupState>(defaultInitialSetupState());

  const { errors, fields } = state;

  const setValueTo = (key: string, value: string): void => {
    setStateTo({ ...state, fields: { ...fields, [key]: value } });
  }

  const save = async (): Promise<void> => {
    const updates: IInitialSetupState = InitialSetupValidator.validate(state);

    if(FormUtility.determineIfValid(updates) && state.status !== RequestStatus.Loading) {
      try {
        setStateTo({ ...updates, status: RequestStatus.Loading });

        const profile: IProfileUpdate = {
          background: defaultUnsplashPhotoReference(),                    
          photo: defaultUnsplashPhotoReference(),
          uid: user.uid,
          username: fields.username
        }

        await ProfileService.create(profile);

        setProfileTo(profile);
      } catch (err) {
        console.error(err);
        
        setStateTo({ ...updates, status: RequestStatus.Error });
      }
    } else {      
      setStateTo(updates);
    }
  }

  const handleOnKeyDown = (e: any): void => {
    if(e.key === "Enter") {
      save();
    }
  }

  return (
    <Modal contentID="initial-profile-setup" wrapperID="initial-profile-setup-wrapper" title="Profile Setup" toggled>      
      <div id="initial-profile-setup-content">
        <Form id="initial-profile-setup-form">
          <FormBody errorMessage={state.errorMessage} status={state.status}>
            <Input label="Username" value={fields.username} maxLength={30} error={errors.username}>
              <input 
                type="text"                 
                maxLength={30}
                placeholder="Enter username" 
                value={fields.username}
                onChange={(e: any) => setValueTo("username", e.target.value)}
                onKeyDown={handleOnKeyDown}
              />
            </Input>
          </FormBody>
          <FormActions 
            actions={[{ id: "Save", label: "Save", handleOnClick: save }]} 
            status={state.status} 
          />
        </Form>
      </div>
    </Modal>
  );
}