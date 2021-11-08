import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { AuthPageBackground } from "../../components/authPageBackground/authPageBackground";
import { AuthPageMessage } from "./components/authPageMessage/authPageMessage";
import { ConfirmPasswordResetForm } from "./components/confirmPasswordResetForm/confirmPasswordResetForm";
import { Page } from "../../components/page/page";
import { VerifyEmailForm } from "./components/verifyEmailForm/verifyEmailForm";

import { AppContext } from "../../components/app/appWrapper";

import { AuthService } from "../../services/authService";

import { FirebaseAuthUtility } from "../../utilities/firebaseAuthUtility";

import { defaultAuthPageState, IAuthPageState } from "./models/authPageState";

import { FirebaseAuthMode } from "../../enums/firebaseAuthMode";
import { RequestStatus } from "../../enums/requestStatus";
import { UserStatus } from "../../enums/userStatus";

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
    } else if (state.mode === FirebaseAuthMode.VerifyEmail) {
      const check = async (): Promise<void> => {
        try {
          const code: string | null = params.get("oobCode");

          await AuthService.checkActionCode(code);

          setStatusTo(RequestStatus.Success);
        } catch (err) {
          console.error(err);
          
          setStatusTo(RequestStatus.Error);
        }
      }

      check();
    }
  }, [state.mode]);

  const getForm = (): JSX.Element => {
    if(state.status !== RequestStatus.Error) {
      switch(state.mode) {
        case FirebaseAuthMode.ResetPassword:
          return (
            <ConfirmPasswordResetForm />
          )
        case FirebaseAuthMode.VerifyEmail:
          return (
            <VerifyEmailForm />
          )
      }
    }
  }

  const getErrorMessage = (): JSX.Element => {
    if(state.status === RequestStatus.Error) {
      switch(state.mode) {
        case FirebaseAuthMode.ResetPassword:
          return (
            <AuthPageMessage
              actionLabel="Try Again"
              actionTo="/reset"
              text="This reset password link is no longer valid. Please try again."
            />
          )
          
        case FirebaseAuthMode.VerifyEmail:
          if(userStatus === UserStatus.SignedOut) {
            return (
              <AuthPageMessage
                actionLabel="Sign In"
                actionTo="/sign-in"
                text="This email verification link is no longer valid."
              />
            )
          } else if (userStatus === UserStatus.SignedIn) {
            return (
              <AuthPageMessage
                actionLabel="Go to my account"
                actionTo="/account"
                text="This email verification link has expired."
              />
            )
          }
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