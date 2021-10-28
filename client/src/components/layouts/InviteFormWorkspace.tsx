import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  FormControl,
  Button,
  Row,
  Col,
  FormText,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../../css/layout/workspace.css";
import UserIcon from "./UserIcon";
import { RootState } from "../../redux/store";
import { inviteUserToWorkspace } from "../../redux/slices/workspace";

const InviteFormWorkspace = () => {
  const initialValues = { username: "" };

  const workspaceState = useSelector((state: RootState) => state.workspaces);

  const dispatch = useDispatch();
  const handlerSubmit = async (
    values: { username: string },
    { resetForm }: any
  ) => {
    const wid = localStorage.getItem("wid");
    const bodyData = { ...values, wid };
    dispatch(inviteUserToWorkspace(bodyData));
    resetForm();
  };

  let usernames: any;
  if (workspaceState.userLoading) {
    usernames = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else
    usernames = (
      <>
        {workspaceState.joinUsers.map((username, index) => {
          <Col key={index} lg={2}>
            <UserIcon username={username} />
          </Col>;
        })}
      </>
    );

  return (
    <div className="invite-side">
      <Formik initialValues={initialValues} onSubmit={handlerSubmit}>
        {({
          values,
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          handleReset,
          isSubmitting,
          setSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row sm={12}>
              <Col lg={2}>
                <FormText>Workspace name</FormText>
              </Col>
              <Col lg={2}>
                <Row>{usernames}</Row>
              </Col>
              <Col lg={2}>
                <FormControl
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                />
              </Col>
              <Col lg={2}>
                <Button type="submit">Invite</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InviteFormWorkspace;
