import React, { useContext, useState } from "react";
import { useLocation } from "react-router";

import { AuthForm } from "../../../../components/authForm/authForm";
import { FormActions } from "../../../../components/form/formActions";
import { FormBody } from "../../../../components/form/formBody";

import { AppContext } from "../../../../components/app/appWrapper";

import { AuthService } from "../../../../services/authService";

import { FirebaseErrorUtility } from "../../../../utilities/firebaseErrorUtility";

import { defaultVerifyEmailFormState, IVerifyEmailFormState } from "./models/verifyEmailFormState";

import { RequestStatus } from "../../../../enums/requestStatus";
import { UserStatus } from "../../../../enums/userStatus";
import { Link } from "react-router-dom";

export const VerifyEmailForm: React.FC = () => {  
  const { userStatus } = useContext(AppContext);
  
  const [state, setStateTo] = useState<IVerifyEmailFormState>(defaultVerifyEmailFormState());

  const { search } = useLocation();

  const params: URLSearchParams = new URLSearchParams(search);

  const setStatusTo = (status: RequestStatus): void => {
    setStateTo({ ...state, status });
  }

  const verifyEmail = async (): Promise<void> => {
    try {
      setStatusTo(RequestStatus.Loading);

      const code: string | null = params.get("oobCode");

      await AuthService.applyActionCode(code);

      setStatusTo(RequestStatus.Success);
    } catch (err) {
      console.error(err);
      
      setStateTo({ status: RequestStatus.Error, errorMessage: FirebaseErrorUtility.getAuthErrorMessage(err.code) });
    }
  }

  const getTitle = (): string => {    
    if(state.status !== RequestStatus.Success) {
      return "Click to verify your email";
    }

    return "Email verified!";
  }

  const getBodyContent = (): JSX.Element => {
    if(state.status === RequestStatus.Success) {
      if(userStatus === UserStatus.SignedIn) {
        return (  
          <Link to="/" className="link rubik-font">
            Home
          </Link>
        )
      }

      return (
        <Link to="/sign-in" className="link rubik-font">
          Sign In
        </Link>
      )
    }
  }

  const getActions = (): JSX.Element => {
    if(state.status !== RequestStatus.Success) {
      return (
        <FormActions 
          actions={[{ label: "Verify", id: "Verify", handleOnClick: verifyEmail }]} 
          status={state.status} 
        />        
      )
    }
  }

  return (       
    <AuthForm title={getTitle()}>
      <FormBody errorMessage={state.errorMessage} status={state.status}>
        {getBodyContent()}
      </FormBody>
      {getActions()}
    </AuthForm>
  );
}