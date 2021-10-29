import React, { useState } from "react";
import { Modal, Button, FormControl } from "react-bootstrap";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { updateColumn } from "../../redux/slices/collumns";
import { updateCard } from "../../redux/slices/card";
import { updateWorkspace } from "../../redux/slices/workspace";
import { Formik, Form } from "formik";

const ModalUpdate = ({ category, categoryObj }: any) => {
  const [showModal, setShowModal] = useState(true);

  const auth = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handlerSubmit = async (values: any) => {
    let bodyData;
    const uid = auth.user.id;
    switch (category) {
      case "columns":
        bodyData = { ...values, id: categoryObj.colId };
        await dispatch(updateColumn(bodyData));
        break;
      case "cards":
        bodyData = { ...values, colId: categoryObj.colId };
        await dispatch(updateCard(bodyData));
        break;
      case "workspaces":
        bodyData = { ...values, uid, wid: categoryObj.id };
        await dispatch(updateWorkspace(bodyData));
        break;
      default:
        break;
    }
    toggleModal();
  };

  let initializeValues: any;
  switch (category) {
    case "columns":
      initializeValues = {
        column_name: categoryObj.title,
        workspace_id: categoryObj.wid,
      };
      break;
    case "cards":
      initializeValues = {
        title: categoryObj.title,
        description: categoryObj.description,
      };
      break;
    case "workspaces":
      initializeValues = {
        workspace_name: categoryObj.workspace_name,
      };
      break;
  }

  const inputColumn = (
    <Formik initialValues={initializeValues} onSubmit={handlerSubmit}>
      {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FormControl
            className="create-input"
            name="column_name"
            placeholder="Title"
            type="text"
            value={values.column_name}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          <Button type="submit" className="btn-add-collumn">
            Update
          </Button>
          <Button onClick={toggleModal} className="btn-cancle-add">
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );

  const inputCard = (
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
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );

  const inputWorkspace = (
    <Formik initialValues={initializeValues} onSubmit={handlerSubmit}>
      {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FormControl
            className="create-input"
            name="workspace_name"
            placeholder="Title"
            type="text"
            value={values.workspace_name}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          <Button type="submit" className="btn-add-collumn">
            Update
          </Button>
          <Button onClick={toggleModal} className="btn-cancle-add">
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );

  let input = null;
  switch (category) {
    case "columns":
      input = inputColumn;
      break;
    case "cards":
      input = inputCard;
      break;
    case "workspaces":
      input = inputWorkspace;
      break;
    default:
      break;
  }

  return (
    <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
      <Modal.Header>Update column</Modal.Header>
      <Modal.Body>{input}</Modal.Body>
    </Modal>
  );
};

export default ModalUpdate;
