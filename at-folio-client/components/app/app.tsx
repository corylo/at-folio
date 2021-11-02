import React from "react";
import { Redirect, Route, Switch } from "react-router";

import { AdminPage, HomePage, ProfilePage, SignInPage, SignUpPage } from "../../pages/pages";

import { useOnAuthStateChangedEffect } from "../../effects/authEffects";

export const App: React.FC = () => {
  useOnAuthStateChangedEffect();

  return (
    <div id="at-folio-app">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/sign-in">
          <SignInPage />
        </Route>
        <Route exact path="/sign-up">
          <SignUpPage />
        </Route>
        <Route exact path="/me">
          <AdminPage />
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