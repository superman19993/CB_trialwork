import React, { useState } from "react";
import { Modal, Button, FormControl, FormLabel } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
const AddCollumnsForm = () => {
  const [showModal, setShowModal] = useState(true);

  const handlerSubmit = (values: any, { resetForm }: any) => {
    resetForm();
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
      <Modal.Header>Add new collumn</Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ title: "", cards: [] }}
          onSubmit={handlerSubmit}
        >
          {({ values, errors, handleBlur, handleChange }) => (
            <Form>
              <FormControl
                className="create-input"
                name="title"
                placeholder="Title"
                type="text"
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <Button className="btn-add-collumn">Add</Button>
              <Button className="btn-cancle-add">Cancle</Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddCollumnsForm;
