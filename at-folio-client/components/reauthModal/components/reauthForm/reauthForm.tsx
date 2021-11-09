import React, { useContext, useState } from "react";

import { Form } from "../../../form/form";
import { FormActions } from "../../../form/formActions";
import { FormBody } from "../../../form/formBody";
import { Input } from "../../../input/input";

import { AppContext } from "../../../app/appWrapper";

import { AuthService } from "../../../../services/authService";

import { ReauthFormValidator } from "./validators/reauthFormValidator";

import { FormUtility } from "../../../../utilities/formUtility";

import { defaultReauthFormState, IReauthFormState } from "./models/reauthFormState";

import { RequestStatus } from "../../../../enums/requestStatus";

export const ReauthForm: React.FC = () => {
  const { user } = useContext(AppContext);

  const [state, setState] = useState<IReauthFormState>(defaultReauthFormState());

  const { errors, fields } = state;

  const setValueTo = (key: string, value: string): void => {
    setState({ ...state, fields: { ...fields, [key]: value } });
  }

  const reauth = async (): Promise<void> => {
    const updates: IReauthFormState = ReauthFormValidator.validate(state);

    if(FormUtility.determineIfValid(updates) && state.status !== RequestStatus.Loading) {
      try {
        setState({ ...updates, status: RequestStatus.Loading });

        await AuthService.reauthenticate(user.email, fields.password);
      } catch (err) {
        console.error(err);
        
        setState({ ...updates, status: RequestStatus.Error, errorMessage: "Password incorrect" });
      }
    } else {      
      setState(updates);
    }
  }

  const handleOnKeyDown = (e: any): void => {
    if(e.key === "Enter") {
      reauth();
    }
  }

  return (
    <Form id="reauth-form">
      <FormBody errorMessage={state.errorMessage} status={state.status}>
        <Input className="reauth-input" label="Password" error={errors.password}>
          <input 
            type="password" 
            placeholder="Enter password" 
            value={fields.password}
            onChange={(e: any) => setValueTo("password", e.target.value)}
            onKeyDown={handleOnKeyDown}
          />
        </Input>  
      </FormBody>
      <FormActions 
        actions={[{ label: "Confirm", id: "Confirm", handleOnClick: reauth }]} 
        status={state.status} 
      /> 
    </Form>
  );
}