import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import BackgroundLoginPage from "../components/auth/BackgroundLoginPage";
import { RootState } from "../redux/store";
import { loadUser } from "../redux/slices/user";

const Login = () => {
  const dispatch = useDispatch();

  const history = localStorage.getItem("history");

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const auth = useSelector((state: RootState) => state.user);
  if (!auth.isAuthenticated)
    return (
      <>
        <BackgroundLoginPage />
      </>
    );
  else return <Redirect to={history ? history : "/profile"} />;
};

export default Login;
