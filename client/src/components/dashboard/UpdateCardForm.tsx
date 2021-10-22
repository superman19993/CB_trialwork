import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import { updateCard } from "../../redux/slices/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchColumns } from "../../redux/slices/collumns";
import { RootState } from "../../redux/store";

const UpdateCardForm = ({
  colId,
  id,
  title,
  description,
}: {
  colId: number;
  id: number;
  title: string;
  description: string;
}) => {
  const [showModal, setShowModal] = useState(true);

  const workspace = useSelector((state: RootState) => state.workspaces);

  const dispatch = useDispatch();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handlerSubmit = async (values: any, { resetForm }: any) => {
    const bodyData = { ...values, id, colId, wid: workspace.wid };
    await dispatch(updateCard(bodyData));
    await dispatch(fetchColumns(workspace.wid));
    toggleModal();
    resetForm();
  };

  const initializeValues = { title: title, description: description };

  return (
    <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
      <Modal.Header>Update card</Modal.Header>
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

              <FormControl
                className="create-input"
                name="description"
                placeholder="Description"
                type="text"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
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

export default UpdateCardForm;
