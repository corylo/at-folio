import React, { useContext, useState } from "react";

import { LoadingIcon } from "../loading/loadingIcon";

import { AppContext } from "../app/appWrapper";

import { AuthService } from "../../services/authService";

import { RequestStatus } from "../../enums/requestStatus";
import { UserStatus } from "../../enums/userStatus";

export const EmailVerificationStatus: React.FC = () => {
  const { user, userStatus } = useContext(AppContext);

  const verified: boolean = user.emailVerified;

  const [status, setStatusTo] = useState<RequestStatus>(RequestStatus.Idle);
  
  if(userStatus === UserStatus.SignedIn) {
    const send = async (): Promise<void> => {
      if(status === RequestStatus.Idle) {
        try {
          setStatusTo(RequestStatus.Loading);

          await AuthService.sendEmailVerification();
          
          setStatusTo(RequestStatus.Success);
        } catch (err) {
          console.error(err);
          
          setStatusTo(RequestStatus.Error);
        }
      }
    }

    const handleOnClick = (): void => {
      if(status === RequestStatus.Idle) {
        send();
      } else {
        setStatusTo(RequestStatus.Idle);
      }
    }

    const getSendButton = (): JSX.Element => {
      if(!verified) {
        const getText = (): string => {
          if(status === RequestStatus.Idle) {
            return "Send verification email";
          } else if (status === RequestStatus.Loading) {
            return "Sending";
          } else if (status === RequestStatus.Success) {
            return "Sent!";
          }

          return "Unable to send";
        }

        return (
          <div className="send-button-wrapper">
            <button type="button" className="send-button rubik-font" disabled={status === RequestStatus.Loading} onClick={handleOnClick}>
              {getText()}
            </button>
            {status === RequestStatus.Loading ? <LoadingIcon /> : null}
          </div>
        )
      }
    }

    return (
      <div className="email-verification-status-wrapper">
        <div className="email-verification-status">
          <i className={verified ? "fa-solid fa-circle-check" : "fa-solid fa-circle-exclamation"} />
          <h1 className="rubik-font">{verified ? "Verified" : "Not Verified"}</h1>
        </div>
        {getSendButton()}
      </div>
    );
  }

  return null;
}