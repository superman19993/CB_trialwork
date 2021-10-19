import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import BackgroundLoginPage from "../components/auth/BackgroundLoginPage";
import { RootState } from "../redux/store";

const Login = () => {
  const auth = useSelector((state: RootState) => state.user);

  if (!auth.isAuthenticated)
    return (
      <>
        <BackgroundLoginPage />
      </>
    );
  else return <Redirect to="/profile" />;
};

export default Login;
