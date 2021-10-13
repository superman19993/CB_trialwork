import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
const UpdateCardForm = ({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description: string;
}) => {
  const [showModal, setShowModal] = useState(true);

  const handlerSubmit = (values: any, { resetForm }: any) => {
    resetForm();
  };

  const initializeValues = { title: title, description: description };

  return (
    <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
      <Modal.Header>Update card</Modal.Header>
      <Modal.Body>
        <Formik initialValues={initializeValues} onSubmit={handlerSubmit}>
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

              <FormControl
                className="create-input"
                name="description"
                placeholder="Description"
                type="text"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Button className="btn-add-collumn">Update</Button>
              <Button className="btn-cancle-add">Cancle</Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateCardForm;
