console.log(`Running application in ${ENV} mode`);
if (ENV === "production") {}

import React from "react";
import ReactDOM from "react-dom";

const app = document.getElementById("app");

import Main from "./Main";
ReactDOM.render(<Main />, app);