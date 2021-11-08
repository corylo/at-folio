import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AuthForm } from "../../../../components/authForm/authForm";
import { FormActions } from "../../../../components/form/formActions";
import { FormBody } from "../../../../components/form/formBody";
import { Input } from "../../../../components/input/input";

import { AuthService } from "../../../../services/authService";

import { SignInFormValidator } from "./validators/signInFormValidator";

import { FirebaseErrorUtility } from "../../../../utilities/firebaseErrorUtility";
import { FormUtility } from "../../../../utilities/formUtility";

import { defaultSignInFormState, ISignInFormState } from "./models/signInFormState";

import { RequestStatus } from "../../../../enums/requestStatus";

export const SignInForm: React.FC = () => {
  const [state, setState] = useState<ISignInFormState>(defaultSignInFormState());

  const { errors, fields } = state;

  const setValueTo = (key: string, value: string): void => {
    setState({ ...state, fields: { ...fields, [key]: value } });
  }

  const signIn = async (): Promise<void> => {
    const updates: ISignInFormState = SignInFormValidator.validate(state);

    if(FormUtility.determineIfValid(updates) && state.status !== RequestStatus.Loading) {
      try {
        setState({ ...updates, status: RequestStatus.Loading });

        await AuthService.signIn(fields.email, fields.password);
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
      signIn();
    }
  }

  return (
    <AuthForm id="sign-in-form" title="Sign In">
      <FormBody errorMessage={state.errorMessage} status={state.status}>
        <Input className="sign-in-input" label="Email" error={errors.email}>
          <input 
            type="text" 
            placeholder="Enter email" 
            value={fields.email}
            onChange={(e: any) => setValueTo("email", e.target.value)}
            onKeyDown={handleOnKeyDown}
          />
        </Input>
        <Input className="sign-in-input" label="Password" error={errors.password}>
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
        actions={[{ label: "Sign In", id: "Sign In", handleOnClick: signIn }]} 
        status={state.status} 
      />          
      <h1 className="auth-form-label-link rubik-font">
        Need an account? <Link to="/sign-up" className="sign-up-link">Sign Up</Link>
      </h1>  
      <h1 className="auth-form-label-link rubik-font">
        <Link to="/reset" className="sign-up-link">Forgot your password?</Link>
      </h1>
    </AuthForm>
  );
}