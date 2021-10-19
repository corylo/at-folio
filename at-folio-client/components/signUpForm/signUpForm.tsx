import React from "react";
import { Link } from "react-router-dom";

import { Form } from "../form/form";
import { FormActions } from "../form/formActions";
import { FormBody } from "../form/formBody";
import { Input } from "../input/input";

interface SignUpFormProps {
  wrapperID?: string;
}

export const SignUpForm: React.FC<SignUpFormProps> = (props: SignUpFormProps) => {
  const getSignInBox = (): JSX.Element => {
    return (
      <Form id="sign-up-form" title="Sign Up">
        <FormBody>
          <Input label="Email">
            <input type="text" placeholder="Enter email" />
          </Input>
          <Input label="Password">
            <input type="password" placeholder="Enter password" />
          </Input>
        </FormBody>
        <FormActions>
          <button type="button" className="button rubik-font">
            Create Account
          </button>
          <h1 className="sign-in-label rubik-font">
            Have an account? <Link to="/" className="sign-in-link">Sign In</Link>
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