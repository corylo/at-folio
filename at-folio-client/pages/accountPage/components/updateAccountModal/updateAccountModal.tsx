import React, { useContext } from "react";

import { IconButton } from "../../../../components/button/iconButton/iconButton";
import { Modal } from "../../../../components/modal/modal";

import { AccountPageContext } from "../../accountPage";

import { AccountAction } from "../../enums/accountAction";

interface UpdateAccountModalProps {
  action: AccountAction;
  children: any;
}

export const UpdateAccountModal: React.FC<UpdateAccountModalProps> = (props: UpdateAccountModalProps) => {
  const { state, setActionTo } = useContext(AccountPageContext);
  
  return (
    <Modal
      status={state.status}       
      toggled={state.action === props.action}
      wrapperClass="update-account-modal-wrapper"
      handleOnBackgroundClick={() => setActionTo(AccountAction.None)}
    >
      <div className="update-account-modal-header">
        <h1 className="update-account-modal-title rubik-font">{props.action}</h1>
        <IconButton 
          className="close-button"
          icon="fa-regular fa-xmark" 
          handleOnClick={() => setActionTo(AccountAction.None)} 
        />
      </div>
      <div className="update-account-modal-content">
        {props.children}
      </div>
    </Modal>
  );
}