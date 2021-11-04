import React, { createContext, useState } from "react";

import { AdminPage } from "./adminPage";

import { IAdminPageContext } from "./models/adminPageContext";
import { defaultAdminPageState, IAdminPageState } from "./models/adminPageState";

export const AdminPageContext = createContext<IAdminPageContext>(null);

export const AdminPageWrapper: React.FC = () => {  
  const [state, setStateTo] = useState<IAdminPageState>(defaultAdminPageState());

  return (
    <AdminPageContext.Provider value={{ state, setStateTo }}>
      <AdminPage />
    </AdminPageContext.Provider>
  )
}