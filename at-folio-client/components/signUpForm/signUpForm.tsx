import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Form } from "../form/form";
import { FormActions } from "../form/formActions";
import { FormBody } from "../form/formBody";
import { Input } from "../input/input";

import { AuthService } from "../../services/authService";

import { SignUpFormValidator } from "./validators/signUpFormValidator";

import { FormUtility } from "../../utilities/formUtility";

import { defaultSignUpFormState, ISignUpFormState } from "./models/signUpFormState";

import { RequestStatus } from "../../enums/requestStatus";

interface SignUpFormProps {
  wrapperID?: string;
}

export const SignUpForm: React.FC<SignUpFormProps> = (props: SignUpFormProps) => {
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

    if(FormUtility.determineIfValid(updates)) {
      try {
        setState({ ...updates, status: RequestStatus.Loading });

        await AuthService.createUser(fields.email, fields.password);

        setStatusTo(RequestStatus.Success);
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

  const getSignInBox = (): JSX.Element => {
    return (
      <Form id="sign-up-form" title="Sign Up">
        <FormBody>
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
          actions={[{ label: "Create Account", handleOnClick: createAccount }]} 
          status={state.status} 
        />          
        <h1 className="sign-in-label rubik-font">
          Have an account? <Link to="/" className="sign-in-link">Sign In</Link>
        </h1>
      </Form>
    );
  }

  if(props.wrapperID) {
    return (
      <div id={props.wrapperID}>
        {getSignInBox()}
      </div>
    )
  }

  return getSignInBox();
}