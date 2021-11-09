import React, { useContext, useEffect, useState } from "react";

import { Form } from "../../../../components/form/form";
import { FormActions } from "../../../../components/form/formActions";
import { FormBody } from "../../../../components/form/formBody";
import { IconButton } from "../../../../components/button/iconButton/iconButton";
import { Input } from "../../../../components/input/input";
import { Modal } from "../../../../components/modal/modal";

import { AccountPageContext } from "../../accountPage";
import { AppContext } from "../../../../components/app/appWrapper";

import { AuthService } from "../../../../services/authService";

import { DeleteAccountFormValidator } from "./validators/deleteAccountFormValidator";

import { FormUtility } from "../../../../utilities/formUtility";

import { defaultDeleteAccountModalState, IDeleteAccountModalState } from "./models/deleteAccountModalState";

import { AccountAction } from "../../enums/accountAction";
import { FirebaseErrorCode } from "../../../../enums/firebaseErrorCode";
import { RequestStatus } from "../../../../enums/requestStatus";

export const DeleteAccountModal: React.FC = () => {
  const { setAppTogglesTo } = useContext(AppContext),
    { action, setActionTo } = useContext(AccountPageContext);
  
  const [state, setStateTo] = useState<IDeleteAccountModalState>(defaultDeleteAccountModalState());

  const { errors, fields } = state;

  useEffect(() => {
    if(action === AccountAction.None) {
      setStateTo(defaultDeleteAccountModalState());
    }
  }, [action]);

  const setValueTo = (key: string, value: string): void => {
    setStateTo({ ...state, fields: { ...fields, [key]: value.toUpperCase() } });
  }

  const deleteAccount = async (): Promise<void> => {
    const updates: IDeleteAccountModalState = DeleteAccountFormValidator.validate(state);

    if(FormUtility.determineIfValid(updates) && state.status !== RequestStatus.Loading) {
      try {
        setStateTo({ ...updates, status: RequestStatus.Loading });

        await AuthService.deleteUser();

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

  const getTitle = (): string => {    
    if(state.status === RequestStatus.Success) {
      return "Account deleted!";
    }

    return AccountAction.DeleteAccount;
  }

  const getBodyContent = (): JSX.Element => {
    if(state.status !== RequestStatus.Success) {
      return (
        <React.Fragment>
          <Input label="Enter Delete" value={fields.confirmText} error={errors.confirmText}>
            <input 
              type="text"                 
              maxLength={30}
              placeholder="Enter DELETE" 
              value={fields.confirmText}
              onChange={(e: any) => setValueTo("confirmText", e.target.value)}
            />
          </Input>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <h1 className="update-account-label rubik-font">Your account has been deleted.</h1>
        <button type="button" className="button rubik-font" onClick={() => setActionTo(AccountAction.None)}>Done</button>
      </React.Fragment>
    )
  }

  const getActions = (): JSX.Element => {
    if(state.status !== RequestStatus.Success) {
      return (
        <FormActions 
          actions={[{ id: "Delete", label: "Delete forever", handleOnClick: deleteAccount }]} 
          status={state.status} 
        />   
      )
    }
  }

  return (
    <Modal
      contentID="delete-account-modal"
      status={state.status}       
      toggled={action === AccountAction.DeleteAccount}
      wrapperClass="update-account-modal-wrapper"
      handleOnBackgroundClick={() => setActionTo(AccountAction.None)}
    >
      <div className="update-account-modal-header">
        <h1 className="update-account-modal-title rubik-font">{getTitle()}</h1>
        <IconButton 
          className="close-button"
          icon="fa-regular fa-xmark" 
          handleOnClick={() => setActionTo(AccountAction.None)} 
        />
      </div>
      <div className="update-account-modal-content">
        <h1 className="update-account-label rubik-font">Are you sure you want to permanently delete your account?</h1>
        <Form id="delete-account-form">
          <FormBody errorMessage={state.errorMessage} status={state.status}>
            {getBodyContent()}
          </FormBody>
          {getActions()}
        </Form>
      </div>
    </Modal>
  );
}