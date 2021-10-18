import React from "react";
import { Formik, Form } from "formik";
import { FormControl, Button, FormLabel } from "react-bootstrap";
import "../../css/auth/login.css";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/slices/user";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handlerSubmit = (values: any, { resetForm }: any) => {
    const bodyData = { ...values };
    dispatch(logIn(bodyData));
    resetForm();
  };

  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <>
      <FormLabel className="title-form">Login page</FormLabel>
      <Formik initialValues={initialValues} onSubmit={handlerSubmit}>
        {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
          <Form className="container-form" onSubmit={handleSubmit}>
            <FormLabel className="subtitle-form">Kanban Board</FormLabel>

            <FormControl
              className="input-form"
              name="username"
              placeholder="Username"
              type="text"
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <FormControl
              className="input-form"
              name="password"
              placeholder="Password"
              type="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <Button className="btn-form" type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;