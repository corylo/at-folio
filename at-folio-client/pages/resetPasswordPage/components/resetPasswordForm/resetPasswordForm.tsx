import React, { useState } from "react";

import { AuthForm } from "../../../../components/authForm/authForm";
import { FormActions } from "../../../../components/form/formActions";
import { FormBody } from "../../../../components/form/formBody";
import { Input } from "../../../../components/input/input";

import { AuthService } from "../../../../services/authService";

import { ResetPasswordFormValidator } from "./validators/resetPasswordFormValidator";

import { FirebaseErrorUtility } from "../../../../utilities/firebaseErrorUtility";
import { FormUtility } from "../../../../utilities/formUtility";

import { defaultResetPasswordFormState, IResetPasswordFormState } from "./models/resetPasswordFormState";

import { RequestStatus } from "../../../../enums/requestStatus";

export const ResetPasswordForm: React.FC = () => {
  const [state, setState] = useState<IResetPasswordFormState>(defaultResetPasswordFormState());

  const { errors, fields } = state;

  const setValueTo = (key: string, value: string): void => {
    setState({ ...state, fields: { ...fields, [key]: value } });
  }

  const sendEmail = async (): Promise<void> => {
    const updates: IResetPasswordFormState = ResetPasswordFormValidator.validate(state);

    if(FormUtility.determineIfValid(updates) && state.status !== RequestStatus.Loading) {
      try {
        setState({ ...updates, status: RequestStatus.Loading });

        await AuthService.sendResetEmail(fields.email);

        setState({ ...state, status: RequestStatus.Success });
      } catch (err) {
        console.error(err);
        
        setState({ ...updates, status: RequestStatus.Error, errorMessage: FirebaseErrorUtility.getAuthErrorMessage(err.code) });
      }
    } else {      
      setState(updates);
    }
  }

  const handleOnKeyDown = (e: any): void => {
    if(e.key === "Enter") {
      sendEmail();
    }
  }

  const getTitle = (): string => {    
    if(state.status !== RequestStatus.Success) {
      return "Reset Password";
    }

    return "Reset email sent to";
  }

  const getBodyContent = (): JSX.Element => {
    if(state.status !== RequestStatus.Success) {
      return (
        <Input className="reset-password-input" label="Email" error={errors.email}>
          <input 
            type="text" 
            placeholder="Enter email" 
            value={fields.email}
            onChange={(e: any) => setValueTo("email", e.target.value)}
            onKeyDown={handleOnKeyDown}
          />
        </Input>
      )
    }

    return (
      <h1 className="form-display-field rubik-font">{fields.email}</h1>
    )
  }

  const getActions = (): JSX.Element => {
    if(state.status !== RequestStatus.Success) {
      return (
        <FormActions 
          actions={[{ label: "Send", id: "Send", handleOnClick: sendEmail }]} 
          status={state.status} 
        />        
      )
    }
  }

  return (
    <AuthForm title={getTitle()}>              
      <FormBody errorMessage={state.errorMessage} status={state.status}>
        {getBodyContent()}
      </FormBody>
      {getActions()}
    </AuthForm>
  );
}