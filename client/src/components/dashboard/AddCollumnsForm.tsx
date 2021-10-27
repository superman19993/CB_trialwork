import React, { useState } from "react";
import { Modal, Button, FormControl, FormLabel } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { createColumn } from "../../redux/slices/collumns";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AddCollumnsForm = () => {
  const [showModal, setShowModal] = useState(true);

  const workspace= useSelector((state:RootState)=>state.workspaces);
  const dispatch = useDispatch();

  const handlerSubmit = (values: any, { resetForm }: any) => {
    const condition= {...values, wid: workspace.wid};
    dispatch(createColumn(condition));
    setShowModal(!showModal);
    resetForm();
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
      <Modal.Header>Add new collumn</Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ column_name: "", workspace_id: workspace.wid }}
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
              <Button className="btn-cancle-add">Cancel</Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddCollumnsForm;
