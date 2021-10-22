import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/slices/user";
import { RootState } from "../../redux/store";
import { Spinner } from "react-bootstrap";

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const ProtectedRoute = ({ component: Component, ...rest }: IProps) => {
  const auth = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (auth.authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else {
    return (
      <Route
        {...rest}
        render={(prop) =>
          auth.isAuthenticated === true ? (
            <>
              <Component {...rest} {...prop} />
            </>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
};

export default ProtectedRoute;
