import React, { useContext } from "react";

import { Input } from "../../../../components/input/input";
import { UpdateAccountModal } from "../updateAccountModal/updateAccountModal";

import { AppContext } from "../../../../components/app/appWrapper";

import { AccountAction } from "../../enums/accountAction";

export const UpdateEmailModal: React.FC = () => {
  const { user } = useContext(AppContext);

  return (
    <UpdateAccountModal action={AccountAction.UpdateEmail}>
      <Input label="Current Email">
        <input type="text" value={user.email} disabled />
      </Input>
    </UpdateAccountModal>
  );
}