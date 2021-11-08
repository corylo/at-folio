import React from "react";

import { UpdateAccountModal } from "../updateAccountModal/updateAccountModal";

import { AccountAction } from "../../enums/accountAction";

export const UpdatePasswordModal: React.FC = () => {
  return (
    <UpdateAccountModal action={AccountAction.UpdatePassword}>
      <div />
    </UpdateAccountModal>
  );
}