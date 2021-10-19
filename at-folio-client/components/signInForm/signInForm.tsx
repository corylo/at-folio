import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Form } from "../form/form";
import { FormActions } from "../form/formActions";
import { FormBody } from "../form/formBody";
import { Input } from "../input/input";

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

  const getSignInBox = (): JSX.Element => {
    return (
      <Form id="sign-in-form" title="Sign In">
        <FormBody>
          <Input className="sign-in-input" label="Email" error={errors.email}>
            <input 
              type="text" 
              placeholder="Enter email" 
              value={fields.email}
              onChange={(e: any) => setValueTo("email", e.target.value)}
            />
          </Input>
          <Input className="sign-in-input" label="Password" error={errors.password}>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={fields.password}
              onChange={(e: any) => setValueTo("password", e.target.value)}
            />
          </Input>
        </FormBody>
        <FormActions status={state.status}>
          <button 
            type="button" 
            className="button rubik-font" 
          >
            {state.status === RequestStatus.Loading ? <i className="fa-solid fa-spinner-third spin-animation" /> : "Sign In"}
          </button>
        </FormActions>
        <h1 className="sign-in-label rubik-font">
          Need an account? <Link to="/sign-up" className="sign-up-link">Sign Up</Link>
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