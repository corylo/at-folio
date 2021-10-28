import React, { useContext, useState } from "react";

import { Form } from "../../../../components/form/form";
import { FormActions } from "../../../../components/form/formActions";
import { FormBody } from "../../../../components/form/formBody";
import { ImagePicker } from "../../../../components/imagePicker/imagePicker";
import { Input } from "../../../../components/input/input";
import { Modal } from "../../../../components/modal/modal";

import { AppContext } from "../../../../components/app/appWrapper";

import { ProfileService } from "../../../../services/profileService";

import { InitialSetupValidator } from "./validators/initialSetupValidator";

import { FormUtility } from "../../../../utilities/formUtility";

import { defaultInitialSetupState, IInitialSetupState } from "./models/initialSetupState";
import { IProfile } from "../../../../../at-folio-models/profile";

import { ProfileImageOption } from "../../../../../at-folio-enums/profileImageOption";
import { RequestStatus } from "../../../../enums/requestStatus";

export const InitialSetup: React.FC = () => {
  const { appState, setProfileTo } = useContext(AppContext);

  const [state, setState] = useState<IInitialSetupState>(defaultInitialSetupState());

  const { errors, fields } = state;

  const setValueTo = (key: string, value: string): void => {
    setState({ ...state, fields: { ...fields, [key]: value } });
  }

  const save = async (): Promise<void> => {
    const updates: IInitialSetupState = InitialSetupValidator.validate(state);

    if(FormUtility.determineIfValid(updates) && state.status !== RequestStatus.Loading) {
      try {
        setState({ ...updates, status: RequestStatus.Loading });

        const profile: IProfile = {
          background: fields.background,
          image: fields.image,
          links: [],
          uid: appState.user.uid,
          username: fields.username
        }

        await ProfileService.create(profile);

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
            <Input label="Select A Profile Image" error={errors.image}>
              <ImagePicker 
                selectedImage={fields.image}
                handleOnClick={(image: ProfileImageOption) => setValueTo("image", image)} 
              />
            </Input>
            <Input label="Select A Background" error={errors.background}>
              <ImagePicker 
                selectedImage={fields.background}
                handleOnClick={(background: ProfileImageOption) => setValueTo("background", background)} 
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