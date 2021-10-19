import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { AppWrapper } from "./components/app/appWrapper";

require("./index.scss");

ReactDOM.render(
  <Router>
    <AppWrapper />
  </Router>,
  document.getElementById("root")
);
