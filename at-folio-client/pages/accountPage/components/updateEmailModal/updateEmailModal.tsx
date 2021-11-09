import React, { useContext, useEffect, useState } from "react";

import { Form } from "../../../../components/form/form";
import { FormActions } from "../../../../components/form/formActions";
import { FormBody } from "../../../../components/form/formBody";
import { Input } from "../../../../components/input/input";
import { UpdateAccountModal } from "../updateAccountModal/updateAccountModal";

import { AccountPageContext } from "../../accountPage";
import { AppContext } from "../../../../components/app/appWrapper";

import { AuthService } from "../../../../services/authService";

import { UpdateEmailFormValidator } from "./validators/updateEmailFormValidator";

import { FormUtility } from "../../../../utilities/formUtility";

import { defaultUpdateEmailModalState, IUpdateEmailModalState } from "./models/updateEmailModalState";

import { AccountAction } from "../../enums/accountAction";
import { FirebaseErrorCode } from "../../../../enums/firebaseErrorCode";
import { RequestStatus } from "../../../../enums/requestStatus";

export const UpdateEmailModal: React.FC = () => {
  const { user, setAppTogglesTo } = useContext(AppContext),
    { action, setActionTo } = useContext(AccountPageContext);

  const [state, setStateTo] = useState<IUpdateEmailModalState>(defaultUpdateEmailModalState());

  const { errors, fields } = state;

  useEffect(() => {
    if(action === AccountAction.None) {
      setStateTo(defaultUpdateEmailModalState());
    }
  }, [action]);

  const setValueTo = (key: string, value: string): void => {
    setStateTo({ ...state, fields: { ...fields, [key]: value } });
  }

  const update = async (): Promise<void> => {
    const updates: IUpdateEmailModalState = UpdateEmailFormValidator.validate(state);

    if(FormUtility.determineIfValid(updates) && state.status !== RequestStatus.Loading) {
      try {
        setStateTo({ ...updates, status: RequestStatus.Loading });

        await AuthService.updateEmail(fields.email);

        setStateTo({ ...state, status: RequestStatus.Success });
      } catch (err) {
        console.error(err);
        
        if(err.code === FirebaseErrorCode.RequiresRecentLogin) {
          setStateTo({ ...updates, status: RequestStatus.Idle });

          setAppTogglesTo({ reauth: true });
        } else {
          setStateTo({ ...updates, status: RequestStatus.Error });
        }
      }
    } else {      
      setStateTo(updates);
    }
  }

  const handleOnKeyDown = (e: any): void => {
    if(e.key === "Enter") {
      update();
    }
  }

  const getCurrentEmail = (): JSX.Element => {
    if(state.status !== RequestStatus.Success) {
      return (
        <Input className="current-email" label="Current Email">
          <input type="text" value={user.email} disabled />
        </Input>
      )
    }
  }

  const getTitle = (): string => {    
    if(state.status === RequestStatus.Success) {
      return "Email updated!";
    }
  }

  const getBodyContent = (): JSX.Element => {
    if(state.status !== RequestStatus.Success) {
      return (
        <React.Fragment>
          <Input label="New Email" value={fields.email} error={errors.email}>
            <input 
              type="text"                 
              maxLength={30}
              placeholder="Enter new email" 
              value={fields.email}
              onChange={(e: any) => setValueTo("email", e.target.value)}
              onKeyDown={handleOnKeyDown}
            />
          </Input>
          <Input label="Confirm New Email" value={fields.confirmedEmail} error={errors.confirmedEmail}>
            <input 
              type="text"                 
              maxLength={30}
              placeholder="Confirm new email" 
              value={fields.confirmedEmail}
              onChange={(e: any) => setValueTo("confirmedEmail", e.target.value)}
              onKeyDown={handleOnKeyDown}
            />
          </Input>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <h1 className="update-account-label rubik-font">We've sent a verification link to your new email address.</h1>
        <h1 className="form-display-field rubik-font">{fields.email}</h1>
        <button type="button" className="button rubik-font" onClick={() => setActionTo(AccountAction.None)}>Done</button>
      </React.Fragment>
    )
  }

  const getActions = (): JSX.Element => {
    if(state.status !== RequestStatus.Success) {
      return (
        <FormActions 
          actions={[{ id: "Update", label: "Update", handleOnClick: update }]} 
          status={state.status} 
        />   
      )
    }
  }

  return (
    <UpdateAccountModal action={AccountAction.UpdateEmail} title={getTitle()}>
      {getCurrentEmail()}
      <Form id="update-email-form">
        <FormBody errorMessage={state.errorMessage} status={state.status}>
          {getBodyContent()}
        </FormBody>
        {getActions()}
      </Form>
    </UpdateAccountModal>
  );
}