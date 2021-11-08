import React from "react";
import { Link } from "react-router-dom";

interface AuthPageMessageProps {
  actionLabel: string;
  actionTo: string;
  text: string;
}

export const AuthPageMessage: React.FC<AuthPageMessageProps> = (props: AuthPageMessageProps) => {  
  return (    
    <div className="auth-page-message-wrapper scroll-bar">
      <div className="auth-page-message">
        <div className="auth-page-message-content">
          <h1 className="rubik-font">{props.text}</h1>
          <Link 
            to={props.actionTo}
            className="link rubik-font" 
          >
            {props.actionLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}