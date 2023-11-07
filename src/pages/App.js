import React, { useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import AuthPage from "./AuthPage";
import HomePage from "./HomePage";

const App = () => {
  const navigate = useNavigate();
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);

  useEffect(() => {
    if (isLogedIn) {
      navigate("user");
    }
  }, [isLogedIn, navigate]);

  return (
    <Routes>
      {!isLogedIn && <Route path="/" element={<AuthPage />} />}
      {isLogedIn && <Route path="/user/*" element={<HomePage />} />}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default App;
