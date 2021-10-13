import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, FormControl } from "react-bootstrap";
import "../../css/card/card.css";

const CreateCardForm: React.FC = () => {
  const initialValue = { title: "", description: "" };

  const handlerSubmit = (values: any, { resetForm }: any) => {
    console.log(values);
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

          <Button className="btn-add" type="submit">
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCardForm;
