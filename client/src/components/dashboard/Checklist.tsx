import { Form, Formik } from "formik";
import { useState } from "react";
import { Button, Card, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "../../css/card/checklist.css";
import { deleteChecklist, fetchChecklists, updateChecklist } from "../../redux/slices/checklist";

const Checklist = ({
  id,
  cardId,
  title,
  status,
}: {
  id: number;
  cardId: number;
  title: string;
  status: number;
}) => {
  const [checked, setChecked] = useState(status == 0 ? false : true);

  const dispatch = useDispatch();

  const onClickChangeStatus = async () => {
    setChecked(!checked);
    status = checked ? 0 : 1;
    const updateForm = { id, status };
    await dispatch(updateChecklist(updateForm));
  };

  const handleInputChange = async (values: any) => {
    const updateForm= {id, title:values.title};
    await dispatch(updateChecklist(updateForm));
  };

  const onClickDeleteChecklist = async ()=>{
    await dispatch(deleteChecklist(id));
    await dispatch(fetchChecklists(cardId));
  }

  const initializeValues={title:title};

  return (
    <Card className="border">
      <Card.Body>
        <Card.Title>
          <Formik initialValues={initializeValues} onSubmit={handleInputChange}>
            {({ values, errors, handleBlur, handleChange, handleSubmit, submitForm }) => (
              <Form onSubmit={handleSubmit} className="form-size">
                <FormControl
                  className="create-input"
                  name="title"
                  placeholder="Title"
                  type="text"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={(e:any)=> {
                    handleChange(e);
                    submitForm();
                  }}
                />
              </Form>
            )}
          </Formik>
        </Card.Title>
        <Card.Title
            onClick={onClickDeleteChecklist}
            className="checklist-delete"
          >
            X
          </Card.Title>
        <Card.Title style={{ float: "right" }}>
          <input
            type="checkbox"
            defaultChecked={checked}
            onChange={onClickChangeStatus}
          />
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Checklist;

