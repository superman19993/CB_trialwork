import React, { useState } from "react";
import { Modal, Button, FormControl, FormLabel } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { createColumn } from "../../redux/slices/collumns";
import { useDispatch } from "react-redux";

const AddCollumnsForm = () => {
  const [showModal, setShowModal] = useState(true);

  const dispatch = useDispatch();

  const handlerSubmit = (values: any, { resetForm }: any) => {
    dispatch(createColumn(values));
    setShowModal(!showModal);
    resetForm();
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
      <Modal.Header>Add new collumn</Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ column_name: "", workspace_id: 1 }}
          onSubmit={handlerSubmit}
        >
          {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <FormControl
                className="create-input"
                name="column_name"
                placeholder="Title"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                required
              />

              <Button type="submit" className="btn-add-collumn">
                Add
              </Button>
              <Button className="btn-cancle-add">Cancle</Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddCollumnsForm;
