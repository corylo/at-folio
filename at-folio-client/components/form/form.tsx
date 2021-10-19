import React from "react";

interface FormProps {
  children: any;
  id?: string;
  title: string;
}

export const Form: React.FC<FormProps> = (props: FormProps) => {
  return (
    <div id={props.id} className="form">
      <div className="form-header">
        <h1 className="form-title rubik-font">{props.title}</h1>
      </div>
      <div className="form-content">
        {props.children}
      </div>
    </div>
  );
}