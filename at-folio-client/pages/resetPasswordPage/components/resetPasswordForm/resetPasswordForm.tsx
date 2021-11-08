import React, { useState } from "react";

import { Form } from "../../../../components/form/form";
import { FormActions } from "../../../../components/form/formActions";
import { FormBody } from "../../../../components/form/formBody";
import { Input } from "../../../../components/input/input";
import { WrappableComponent } from "../../../../components/wrappableComponent/wrappableComponent";

import { AuthService } from "../../../../services/authService";

import { ResetPasswordFormValidator } from "./validators/resetPasswordFormValidator";

import { FirebaseErrorUtility } from "../../../../utilities/firebaseErrorUtility";
import { FormUtility } from "../../../../utilities/formUtility";

import { defaultResetPasswordFormState, IResetPasswordFormState } from "./models/resetPasswordFormState";

import { RequestStatus } from "../../../../enums/requestStatus";

interface ResetPasswordFormProps {
  wrapperID?: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = (props: ResetPasswordFormProps) => {
  const [state, setState] = useState<IResetPasswordFormState>(defaultResetPasswordFormState());

  const { errors, fields } = state;

  const setValueTo = (key: string, value: string): void => {
    setState({ ...state, fields: { ...fields, [key]: value } });
  }

  const resetPassword = async (): Promise<void> => {
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
      resetPassword();
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
      <h1 className="sent-to-email-label rubik-font">{fields.email}</h1>
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
    <WrappableComponent wrapperID={props.wrapperID}>
      <Form id="reset-password-form" title={getTitle()}>
        <FormBody errorMessage={state.errorMessage} status={state.status}>
          {getBodyContent()}
        </FormBody>
        {getActions()}
      </Form>
    </WrappableComponent>
  );
}