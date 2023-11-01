import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "../store/index";

const IndexPage = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
