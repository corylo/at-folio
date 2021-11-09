import React from "react";
import { Redirect, Route, Switch } from "react-router";

import { AccountPage, AuthPage, HomePage, ProfileManagerPageWrapper, ProfilePageWrapper, ResetPasswordPage, SignInPage, SignUpPage } from "../../pages/pages";

import { ReauthModal } from "../reauthModal/reauthModal";

import { useOnAuthStateChangedEffect } from "../../effects/authEffects";

export const App: React.FC = () => {
  useOnAuthStateChangedEffect();

  return (
    <div id="at-folio-app">
      <ReauthModal />
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
        <Route exact path="/auth">
          <AuthPage />
        </Route>
        <Route exact path="/reset">
          <ResetPasswordPage />
        </Route>
        <Route exact path="/me">
          <ProfileManagerPageWrapper />
        </Route>
        <Route exact path="/account">
          <AccountPage />
        </Route>
        <Route exact path="/:username">
          <ProfilePageWrapper />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  )
}