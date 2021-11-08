import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Form } from "../form/form";
import { FormActions } from "../form/formActions";
import { FormBody } from "../form/formBody";
import { Input } from "../input/input";
import { WrappableComponent } from "../wrappableComponent/wrappableComponent";

import { AuthService } from "../../services/authService";

import { SignInFormValidator } from "./validators/signInFormValidator";

import { FirebaseErrorUtility } from "../../utilities/firebaseErrorUtility";
import { FormUtility } from "../../utilities/formUtility";

import { defaultSignInFormState, ISignInFormState } from "./models/signInFormState";

import { RequestStatus } from "../../enums/requestStatus";

interface SignInFormProps {
  wrapperID?: string;
}

export const SignInForm: React.FC<SignInFormProps> = (props: SignInFormProps) => {
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
    <WrappableComponent wrapperID={props.wrapperID}>
      <Form id="sign-in-form" title="Sign In">
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
          <h1 className="reset-password-label rubik-font">
            <Link to="/reset" className="sign-up-link">Forgot your password?</Link>
          </h1>
        </FormBody>
        <FormActions 
          actions={[{ label: "Sign In", id: "Sign In", handleOnClick: signIn }]} 
          status={state.status} 
        />          
        <h1 className="sign-in-label rubik-font">
          Need an account? <Link to="/sign-up" className="sign-up-link">Sign Up</Link>
        </h1>
      </Form>
    </WrappableComponent>
  );
}