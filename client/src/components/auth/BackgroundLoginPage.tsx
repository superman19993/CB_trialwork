import React from "react";
import "../../css/auth/login.css";
import { RootState } from "../../redux/store";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const BackgroundLoginPage = () => {
  const auth = useSelector((state: RootState) => state.user);

  let body;

  if (auth.isAuthenticated) {
    return <Redirect to="/profile" />;
  } else {
    body = (
      <>
        <LoginForm />
      </>
    );
  }

  return <div className="bg-login">{body}</div>;
};

export default BackgroundLoginPage;
