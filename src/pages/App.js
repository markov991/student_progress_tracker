import React from "react";

import { useSelector } from "react-redux";
import AuthPage from "./AuthPage";
import HomePage from "./HomePage";

const App = () => {
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);

  return (
    <>
      {!isLogedIn && <AuthPage />}
      {isLogedIn && <HomePage />}
    </>
  );
};

export default App;
