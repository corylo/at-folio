import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AuthForm } from "../../../../components/authForm/authForm";
import { FormActions } from "../../../../components/form/formActions";
import { FormBody } from "../../../../components/form/formBody";
import { Input } from "../../../../components/input/input";

import { AuthService } from "../../../../services/authService";

import { SignUpFormValidator } from "./validators/signUpFormValidator";

import { FormUtility } from "../../../../utilities/formUtility";

import { defaultSignUpFormState, ISignUpFormState } from "./models/signUpFormState";

import { RequestStatus } from "../../../../enums/requestStatus";

export const SignUpForm: React.FC = () => {
  const [state, setState] = useState<ISignUpFormState>(defaultSignUpFormState());

  const { errors, fields } = state;

  const setFieldTo = (key: string, value: string): void => {
    setState({ ...state, fields: { ...fields, [key]: value } });
  }

  const setStatusTo = (status: RequestStatus): void => {
    setState({ ...state, status });
  }

  const createAccount = async (): Promise<void> => {
    const updates: ISignUpFormState = SignUpFormValidator.validate(state);

    if(FormUtility.determineIfValid(updates) && state.status !== RequestStatus.Loading) {
      try {
        setState({ ...updates, status: RequestStatus.Loading });

        await AuthService.createUser(fields.email, fields.password);
      } catch (err) {
        console.error(err);
        
        setStatusTo(RequestStatus.Error);
      }
    } else {      
      setState(updates);
    }
  }

  const handleOnKeyDown = (e: any): void => {
    if(e.key === "Enter") {
      createAccount();
    }
  }

  return (
    <AuthForm id="sign-up-form" title="Sign Up">
      <FormBody status={state.status}>
        <Input label="Email" error={errors.email}>
          <input 
            type="email" 
            placeholder="Enter email" 
            value={fields.email}
            disabled={state.status === RequestStatus.Loading}
            onChange={(e: any) => setFieldTo("email", e.target.value)}
            onKeyDown={handleOnKeyDown}
          />
        </Input>
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
      </FormBody>
      <FormActions 
        actions={[{ label: "Create Account", id: "Create Account", handleOnClick: createAccount }]} 
        status={state.status} 
      />          
      <h1 className="auth-form-label-link rubik-font">
        Have an account? <Link to="/sign-in" className="sign-in-link">Sign In</Link>
      </h1>
    </AuthForm>
  );
}