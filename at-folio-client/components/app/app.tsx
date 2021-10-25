import React from "react";
import { Redirect, Route, Switch } from "react-router";

import { HomePage, ProfilePage, SignUpPage } from "../../pages/pages";

import { MainMenu } from "../mainMenu/mainMenu";
import { Navbar } from "../navbar/navbar";

import { useOnAuthStateChangedEffect } from "../../effects/authEffects";

export const App: React.FC = () => {
  useOnAuthStateChangedEffect();

  return (
    <div id="at-folio-app">
      <Navbar />
      <MainMenu />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/sign-up">
          <SignUpPage />
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