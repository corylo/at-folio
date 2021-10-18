import React from "react";
import { Redirect, Route, Switch } from "react-router";

import { HomePage, ProfilePage } from "../../pages/pages";
import { Logo } from "../logo/logo";

export const App: React.FC = () => {
  return (
    <div id="at-folio-app">
      <Logo wrapperID="at-folio-logo" />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/:username">
          <ProfilePage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  )
}