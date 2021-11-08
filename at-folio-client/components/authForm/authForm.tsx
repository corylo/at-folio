import React from "react";

import { Form } from "../form/form";

interface AuthFormProps {
  children: any;
  id?: string;
  title: string;
}

export const AuthForm: React.FC<AuthFormProps> = (props: AuthFormProps) => {  
  return (
    <div id={props.id} className="auth-form-wrapper scroll-bar">
      <Form className="auth-form" title={props.title}>
        {props.children}
      </Form>
    </div>
  );
}