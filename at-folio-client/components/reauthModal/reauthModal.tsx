import React, { useContext } from "react";

import { IconButton } from "../button/iconButton/iconButton";
import { Modal } from "../../components/modal/modal";
import { ReauthForm } from "./components/reauthForm/reauthForm";

import { AppContext } from "../app/appWrapper";

export const ReauthModal: React.FC = () => {
  const { toggles, setAppTogglesTo } = useContext(AppContext);

  return (
    <Modal  
      toggled={toggles.reauth}
      wrapperClass="reauth-modal-wrapper"
    >
      <div className="reauth-modal-header">
        <h1 className="reauth-modal-title rubik-font">Confirm password</h1>
        <IconButton 
          className="close-button"
          icon="fa-regular fa-xmark" 
          handleOnClick={() => setAppTogglesTo({ reauth: false })} 
        />
      </div>
      <div className="reauth-modal-content">
        <ReauthForm />
      </div>
    </Modal>
  );
}