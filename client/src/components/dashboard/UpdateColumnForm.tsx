import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import { updateCard } from "../../redux/slices/card";
import { useDispatch } from "react-redux";
import { fetchColumns } from "../../redux/slices/collumns";

const UpdateColumnForm = ({
  colId,
  title,
}: {
  colId: number;
  title: string;
}) => {
  const [showModal, setShowModal] = useState(true);

  const dispatch = useDispatch();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handlerSubmit = async (values: any, { resetForm }: any) => {
    const bodyData = { ...values, colId };
    await dispatch(updateCard(bodyData));
    await dispatch(fetchColumns());
    toggleModal();
    resetForm();
  };

  const initializeValues = { title: title };

  return (
    <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
      <Modal.Header>Update column</Modal.Header>
      <Modal.Body>
        <Formik initialValues={initializeValues} onSubmit={handlerSubmit}>
          {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <FormControl
                className="create-input"
                name="title"
                placeholder="Title"
                type="text"
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <Button type="submit" className="btn-add-collumn">
                Update
              </Button>
              <Button onClick={toggleModal} className="btn-cancle-add">
                Cancle
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateColumnForm;
