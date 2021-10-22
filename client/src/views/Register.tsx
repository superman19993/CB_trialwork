import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import BackgroundRegisterPage from "../components/auth/BackgroundRegisterPage";
import { RootState } from "../redux/store";

const Register = () => {
  const auth = useSelector((state: RootState) => state.user);

  if (!auth.isAuthenticated)
    return (
      <>
        <BackgroundRegisterPage />
      </>
    );
  else return <Redirect to="/profile" />;
};

export default Register;
