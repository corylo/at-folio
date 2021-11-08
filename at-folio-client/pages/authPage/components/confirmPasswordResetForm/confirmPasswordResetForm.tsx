import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { AuthForm } from "../../../../components/authForm/authForm";
import { FormActions } from "../../../../components/form/formActions";
import { FormBody } from "../../../../components/form/formBody";
import { Input } from "../../../../components/input/input";

import { AuthService } from "../../../../services/authService";

import { ConfirmPasswordResetFormValidator } from "./validators/confirmPasswordResetFormValidator";

import { FirebaseErrorUtility } from "../../../../utilities/firebaseErrorUtility";
import { FormUtility } from "../../../../utilities/formUtility";

import { defaultConfirmPasswordResetFormState, IConfirmPasswordResetFormState } from "./models/confirmPasswordResetFormState";

import { RequestStatus } from "../../../../enums/requestStatus";

export const ConfirmPasswordResetForm: React.FC = () => {
  const [state, setState] = useState<IConfirmPasswordResetFormState>(defaultConfirmPasswordResetFormState());

  const { errors, fields } = state;

  const { search } = useLocation();

  const params: URLSearchParams = new URLSearchParams(search);

  const setFieldTo = (key: string, value: string): void => {
    setState({ ...state, fields: { ...fields, [key]: value } });
  }

  const resetPassword = async (): Promise<void> => {
    const updates: IConfirmPasswordResetFormState = ConfirmPasswordResetFormValidator.validate(state);

    if(FormUtility.determineIfValid(updates) && state.status !== RequestStatus.Loading) {
      try {
        setState({ ...updates, status: RequestStatus.Loading });

        const code: string | null = params.get("oobCode");

        await AuthService.confirmPasswordReset(code, fields.password);

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
      resetPassword();
    }
  }

  const getTitle = (): string => {    
    if(state.status !== RequestStatus.Success) {
      return "Reset Password";
    }

    return "Password reset!";
  }

  const getBodyContent = (): JSX.Element => {
    if(state.status !== RequestStatus.Success) {
      return (
        <Input label="Password" error={errors.password}>
          <input 
            type="password" 
            placeholder="Enter password" 
            value={fields.password}
            disabled={state.status === RequestStatus.Loading}
            onChange={(e: any) => setFieldTo("password", e.target.value)}
            onKeyDown={handleOnKeyDown}
          />
        </Input>
      )
    }

    return (
      <Link 
        to="/sign-in"
        className="link rubik-font" 
      >
        Sign In
      </Link>
    )
  }

  const getActions = (): JSX.Element => {
    if(state.status !== RequestStatus.Success) {
      return (
        <FormActions 
          actions={[{ label: "Reset", id: "Reset", handleOnClick: resetPassword }]} 
          status={state.status} 
        />        
      )
    }
  }

  return (
    <div className="auth">
      <AuthForm title={getTitle()}>
        <FormBody errorMessage={state.errorMessage} status={state.status}>
          {getBodyContent()}
        </FormBody>
        {getActions()}
      </AuthForm>
    </div>
  );
}