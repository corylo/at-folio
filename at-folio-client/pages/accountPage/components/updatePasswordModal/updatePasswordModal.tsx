import React, { useContext, useEffect, useState } from "react";

import { Form } from "../../../../components/form/form";
import { FormActions } from "../../../../components/form/formActions";
import { FormBody } from "../../../../components/form/formBody";
import { Input } from "../../../../components/input/input";
import { UpdateAccountModal } from "../updateAccountModal/updateAccountModal";

import { AccountPageContext } from "../../accountPage";
import { AppContext } from "../../../../components/app/appWrapper";

import { AuthService } from "../../../../services/authService";

import { UpdatePasswordFormValidator } from "./validators/updatePasswordFormValidator";

import { FormUtility } from "../../../../utilities/formUtility";

import { defaultUpdatePasswordModalState, IUpdatePasswordModalState } from "./models/updatePasswordModalState";

import { AccountAction } from "../../enums/accountAction";
import { FirebaseErrorCode } from "../../../../enums/firebaseErrorCode";
import { RequestStatus } from "../../../../enums/requestStatus";

export const UpdatePasswordModal: React.FC = () => {
  const { setAppTogglesTo } = useContext(AppContext),
    { action, setActionTo } = useContext(AccountPageContext);

  const update = async (): Promise<void> => {
    const updates: IUpdatePasswordModalState = UpdatePasswordFormValidator.validate(state);

    if(FormUtility.determineIfValid(updates) && state.status !== RequestStatus.Loading) {
      try {
        setStateTo({ ...updates, status: RequestStatus.Loading });

        await AuthService.updatePassword(fields.password);

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

  const getTitle = (): string => {    
    if(state.status === RequestStatus.Success) {
      return "Password updated!";
    }
  }

  const getBodyContent = (): JSX.Element => {
    if(state.status !== RequestStatus.Success) {
      return (
        <React.Fragment>
          <Input label="New Password" value={fields.password} error={errors.password}>
            <input 
              type="password"                 
              maxLength={30}
              placeholder="Enter new password" 
              value={fields.password}
              onChange={(e: any) => setValueTo("password", e.target.value)}
              onKeyDown={handleOnKeyDown}
            />
          </Input>
          <Input label="Confirm New Password" value={fields.confirmedPassword} error={errors.confirmedPassword}>
            <input 
              type="password"                 
              maxLength={30}
              placeholder="Confirm new password" 
              value={fields.confirmedPassword}
              onChange={(e: any) => setValueTo("confirmedPassword", e.target.value)}
              onKeyDown={handleOnKeyDown}
            />
          </Input>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <h1 className="update-account-label rubik-font">Your password has been updated.</h1>        
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

  const [state, setStateTo] = useState<IUpdatePasswordModalState>(defaultUpdatePasswordModalState());

  const { errors, fields } = state;

  useEffect(() => {
    if(action === AccountAction.None) {
      setStateTo(defaultUpdatePasswordModalState());
    }
  }, [action]);

  const setValueTo = (key: string, value: string): void => {
    setStateTo({ ...state, fields: { ...fields, [key]: value } });
  }

  return (
    <UpdateAccountModal action={AccountAction.UpdatePassword} title={getTitle()}>
      <Form id="update-password-form">
        <FormBody errorMessage={state.errorMessage} status={state.status}>
          {getBodyContent()}
        </FormBody>
        {getActions()}
      </Form>
    </UpdateAccountModal>
  );
}