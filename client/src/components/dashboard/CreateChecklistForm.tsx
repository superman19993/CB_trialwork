import { Form, Formik } from "formik";
import { Button, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createChecklist, fetchChecklists } from "../../redux/slices/checklist";

const CreateChecklistForm = ({ cardid }: { cardid: number }) => {
  const initialValue = { title: "" };

  const dispatch = useDispatch();

  const handlerSubmit = async (values: any, { resetForm }: any) => {
    const {title}= values;

    const bodyData = {title:title, cardid};
    console.log(values);
    await dispatch(createChecklist(bodyData));
    await dispatch(fetchChecklists(cardid));
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
      submitForm,
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
        
        <Button className="btn-add" onClick= {submitForm}>
          Add
        </Button>
      </Form>
    )}
  </Formik>
  );
};

export default CreateChecklistForm;
