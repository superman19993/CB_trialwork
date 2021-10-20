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
import "../../css/auth/login.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const handlerSubmit = (values: any, { resetForm }: any) => {
    resetForm();
  };

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPasword: "",
  };

  return (
    <>
      <FormLabel className="title-form-1">Register page</FormLabel>
      <Formik initialValues={initialValues} onSubmit={handlerSubmit}>
        {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
          <Form className="container-form-1" onSubmit={handleSubmit}>
            <FormLabel className="subtitle-form-1">Kanban Board</FormLabel>

            <FormControl
              className="input-form-1"
              name="username"
              placeholder="Username"
              type="text"
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />

            <FormControl
              className="input-form-1"
              name="email"
              placeholder="Email"
              type="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />

            <FormControl
              className="input-form-1"
              name="password"
              placeholder="Password"
              type="password"
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />

            <FormControl
              className="input-form-1"
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />
            <Row className="goto-1">
              <Col lg={6}>
                <FormText to="/login" as={Link}>
                  Login here
                </FormText>
              </Col>
              <Col lg={6}>
                <Button className="btn-form-1" type="submit">
                  <FormText to="/dashboard" as={Link}>
                    Register
                  </FormText>
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
