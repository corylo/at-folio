import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { AuthPageBackground } from "../../components/authPageBackground/authPageBackground";
import { ConfirmPasswordResetForm } from "./components/confirmPasswordResetForm/confirmPasswordResetForm";
import { Page } from "../../components/page/page";

import { AppContext } from "../../components/app/appWrapper";

import { AuthService } from "../../services/authService";

import { FirebaseAuthUtility } from "../../utilities/firebaseAuthUtility";

import { defaultAuthPageState, IAuthPageState } from "./models/authPageState";

import { FirebaseAuthMode } from "../../enums/firebaseAuthMode";
import { RequestStatus } from "../../enums/requestStatus";

export const AuthPage: React.FC = () => {
  const { userStatus } = useContext(AppContext);

  const [state, setStateTo] = useState<IAuthPageState>(defaultAuthPageState());

  const { search } = useLocation();

  const params: URLSearchParams = new URLSearchParams(search);

  const setModeTo = (mode: FirebaseAuthMode): void => {
    setStateTo({ ...state, mode });
  }

  const setStatusTo = (status: RequestStatus): void => {
    setStateTo({ ...state, status });
  }

  useEffect(() => {
    const param: string | null = params.get("mode");

    if(param) {
      setModeTo(FirebaseAuthUtility.getMode(param));
    }
  }, []);

  useEffect(() => {
    if(state.mode === FirebaseAuthMode.ResetPassword) {
      const verify = async (): Promise<void> => {
        try {
          const code: string | null = params.get("oobCode");

          await AuthService.verifyPasswordResetCode(code);

          setStatusTo(RequestStatus.Success);
        } catch (err) {
          console.error(err);
          
          setStatusTo(RequestStatus.Error);
        }
      }

      verify();
    }
  }, [state.mode]);

  const getForm = (): JSX.Element => {
    if(state.status !== RequestStatus.Error) {
      switch(state.mode) {
        case FirebaseAuthMode.ResetPassword:
          return (
            <ConfirmPasswordResetForm />
          )
      }
    }
  }

  const getErrorMessage = (): JSX.Element => {
    if(state.status === RequestStatus.Error) {
      switch(state.mode) {
        case FirebaseAuthMode.ResetPassword:
          return (
            <div className="auth-page-error-message-wrapper">
              <div className="auth-page-error-message">
                <h1 className="rubik-font">Your reset password link has expired. Please try again.</h1>
                <Link 
                  to="/reset"
                  className="link rubik-font" 
                >
                  Try Again
                </Link>
              </div>
            </div>
          )
      }
    }
  }

  return (
    <Page id="auth-page" status={state.status}>      
      <AuthPageBackground />
      {getForm()}
      {getErrorMessage()}
    </Page>
  )
}