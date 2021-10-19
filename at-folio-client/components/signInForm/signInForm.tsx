import React from "react";
import { Link } from "react-router-dom";

import { Form } from "../form/form";
import { FormActions } from "../form/formActions";
import { FormBody } from "../form/formBody";
import { Input } from "../input/input";

interface SignInFormProps {
  wrapperID?: string;
}

export const SignInForm: React.FC<SignInFormProps> = (props: SignInFormProps) => {
  const getSignInBox = (): JSX.Element => {
    return (
      <Form id="sign-in-form" title="Sign In">
        <FormBody>
          <Input className="sign-in-input" label="Email">
            <input type="text" placeholder="Enter email" />
          </Input>
          <Input className="sign-in-input" label="Password">
            <input type="password" placeholder="Enter password" />
          </Input>
        </FormBody>
        <FormActions>
          <button type="button" className="button rubik-font">
            Sign In
          </button>
          <h1 className="sign-up-label rubik-font">
            Need an account? <Link to="/sign-up" className="sign-up-link">Sign Up</Link>
          </h1>
        </FormActions>
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