import React from "react";
import { Formik, Form } from "formik";
import {
  FormControl,
  Button,
  FormLabel,
  FormText,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/auth/login.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/user";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handlerSubmit = (values: any, { resetForm }: any) => {
    dispatch(login(values));
    // resetForm();
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

            <Row className="goto">
              <Col lg={6}>
                <FormText to="/Register" as={Link}>
                  Register here
                </FormText>
              </Col>
              <Col lg={6}>
                <Button className="btn-form" type="submit">
                  <FormText>Login</FormText>
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
