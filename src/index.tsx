import React from "react";
import { App } from "app/App";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import MainPage from "pages/MainPage";

const root = (
  <BrowserRouter>
    <MainPage />
  </BrowserRouter>
);

ReactDOM.render(root, document.getElementById("root"));
