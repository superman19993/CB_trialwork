import React, { useState } from "react";
import { Modal, Button, FormControl, FormLabel, Card } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { createColumn, fetchColumns } from "../../redux/slices/collumns";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createWorkspace } from "../../redux/slices/workspace";

const ModalCreate = ({ category }: { category: string }) => {
  const [showModal, setShowModal] = useState(false);

  const workspace = useSelector((state: RootState) => state.workspaces);
  const dispatch = useDispatch();

  const handlerSubmit = async (values: any, { resetForm }: any) => {
    console.log("123");
    const uid = localStorage.getItem("Authorization");
    const condition = { ...values, uid };
    await dispatch(createWorkspace(condition));
    setShowModal(false);
    resetForm();
  };

  const toggleBtn = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <>
        <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
          <Modal.Header>Add new workspace</Modal.Header>
          <Modal.Body>
            <Formik initialValues={{ name: "" }} onSubmit={handlerSubmit}>
              {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <FormControl
                    className="create-input"
                    name="name"
                    placeholder="Workspace name"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                  />

                  <Button type="submit" className="btn-add-collumn">
                    Add
                  </Button>
                  <Button className="btn-cancle-add">Cancel</Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
        <div>
          <Card className="cardw-side-2">
            <Card.Body className="create">
              <Card.Link onClick={toggleBtn}>Create new workspace</Card.Link>
            </Card.Body>
          </Card>
        </div>
      </>
    </div>
  );
};

export default ModalCreate;
