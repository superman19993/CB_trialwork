import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import { updateCard } from "../../redux/slices/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchColumns, updateColumn } from "../../redux/slices/collumns";
import { RootState } from "../../redux/store";

const UpdateColumnForm = ({
  colId,
  title,
}: {
  colId: number | string;
  title: string;
}) => {
  const [showModal, setShowModal] = useState(true);

  const workspace = useSelector((state: RootState) => state.workspaces);

  const dispatch = useDispatch();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handlerSubmit = async (values: any) => {
    const bodyData = { ...values, id: colId, wid: workspace.wid };
    await dispatch(updateColumn(bodyData));
    await dispatch(fetchColumns(workspace.wid));
    toggleModal();
  };

  const initializeValues = { column_name: title, workspace_id: 1 };

  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header>Update column</Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};

export default UpdateColumnForm;
