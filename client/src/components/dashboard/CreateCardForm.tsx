import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, FormControl } from "react-bootstrap";
import "../../css/card/card.css";
import { createCard } from "../../redux/slices/card";
import { useDispatch } from "react-redux";

const CreateCardForm = ({ id }: { id: number }) => {
  const initialValue = { title: "", description: "" };

  const dispatch = useDispatch();

  const handlerSubmit = (values: any, { resetForm }: any) => {
    const bodyData = { ...values, id };
    dispatch(createCard(bodyData));
    resetForm();
  };

  return (
    <Formik initialValues={initialValue} onSubmit={handlerSubmit}>
      {({
        values,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        handleReset,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormControl
            className="create-input"
            name="title"
            placeholder="Title"
            type="text"
            value={values.title}
            onBlur={handleBlur}
            onChange={handleChange}
            required
          />
          <FormControl
            className="create-input"
            name="description"
            placeholder="Description"
            type="text"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />

          <Button className="btn-add" type="submit">
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCardForm;
