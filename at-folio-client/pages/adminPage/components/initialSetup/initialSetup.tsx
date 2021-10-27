import React, { useContext, useState } from "react";

import { BackgroundPicker } from "../../../../components/backgroundPicker/backgroundPicker";
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

import { ProfileBackgroundImage } from "../../../../../at-folio-enums/profileBackgroundImage";
import { RequestStatus } from "../../../../enums/requestStatus";

interface InitialSetupProps {

}

export const InitialSetup: React.FC<InitialSetupProps> = (props: InitialSetupProps) => {
  const { appState, setProfileTo } = useContext(AppContext);

  const [state, setState] = useState<IInitialSetupState>(defaultInitialSetupState());

  const { errors, fields } = state;

  const setValueTo = (key: string, value: string): void => {
    setState({ ...state, fields: { ...fields, [key]: value } });
  }

  const save = async (): Promise<void> => {
    const updates: IInitialSetupState = InitialSetupValidator.validate(state);

    if(FormUtility.determineIfValid(updates)) {
      try {
        setState({ ...updates, status: RequestStatus.Loading });

        const profile: IProfileUpdate = {
          background: fields.background,
          image: "",
          uid: appState.user.uid,
          username: fields.username
        }

        await ProfileService.update(fields.username, profile);

        setProfileTo(profile);
      } catch (err) {
        console.error(err);
        
        setState({ ...updates, status: RequestStatus.Error });
      }
    } else {      
      setState(updates);
    }
  }

  return (
    <Modal contentID="initial-setup" wrapperID="initial-setup-wrapper" title="Profile Setup" toggled>      
      <div id="initial-setup-content">
        <Form id="sign-in-form">
          <FormBody errorMessage={state.errorMessage} status={state.status}>
            <Input label="Username" error={errors.username}>
              <input 
                type="text" 
                placeholder="Enter username" 
                value={fields.username}
                onChange={(e: any) => setValueTo("username", e.target.value)}
              />
            </Input>
            <Input label="Select A Background" error={errors.background}>
              <BackgroundPicker 
                selectedBackground={fields.background}
                handleOnClick={(background: ProfileBackgroundImage) => setValueTo("background", background)} 
              />
            </Input>
          </FormBody>
          <FormActions 
            actions={[{ label: "Save", handleOnClick: save }]} 
            status={state.status} 
          />
        </Form>
      </div>
    </Modal>
  );
}