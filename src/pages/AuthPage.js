import React from "react";
import Card from "../components/UI/Card";
import SiteDescription from "../components/SiteDescription/SiteDescription";
import AuthForm from "../components/Auth/AuthForm";

const AuthPage = () => {
  return (
    <div>
      <Card>
        <SiteDescription />
        <AuthForm />
      </Card>
    </div>
  );
};

export default AuthPage;
