import { Form, Formik } from "formik";
import { useState } from "react";
import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../../css/card/checklist.css";
import { getPercentage } from "../../redux/slices/card";
import {
  deleteChecklist,
  fetchChecklists,
  updateChecklist,
} from "../../redux/slices/checklist";
import { fetchColumns } from "../../redux/slices/collumns";
import { RootState } from "../../redux/store";

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
  const checklists= useSelector((state:RootState)=> state.checklists);

  const [checked, setChecked] = useState(status == 0 ? false : true);

  const dispatch = useDispatch();

  const onClickChangeStatus = async () => {
    setChecked(!checked);
    status = checked ? 0 : 1;
    const updateForm = { id, status };
    await dispatch(updateChecklist(updateForm));
    await dispatch(fetchChecklists(cardId));
    const wid = localStorage.getItem('wid');
    await dispatch(getPercentage(cardId));

  };

  const handleInputChange = async (values: any) => {
    const updateForm = { id, title: values.title };
    await dispatch(updateChecklist(updateForm));
  };

  const onClickDeleteChecklist = async () => {
    await dispatch(deleteChecklist(id));
    await dispatch(fetchChecklists(cardId));
  };

  const initializeValues = { title: title };

  return (
    <Card className="border">
      <Card.Body className="cardbody">
        <Row>
          <Col lg={8}>
            <Card.Title>
              <Formik
                initialValues={initializeValues}
                onSubmit={handleInputChange}
              >
                {({
                  values,
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  submitForm,
                }) => (
                  <Form onSubmit={handleSubmit} className="form-size">
                    <FormControl
                      className="create-input"
                      style={{ marginTop: "4px" }}
                      name="title"
                      placeholder="Title"
                      type="text"
                      value={values.title}
                      onBlur={handleBlur}
                      onChange={(e: any) => {
                        handleChange(e);
                        submitForm();
                      }}
                    />
                  </Form>
                )}
              </Formik>
            </Card.Title>
          </Col>
          <Col lg={2}>
            <Card.Title style={{ float: "right" }} className="checkbox">
              <input
                type="checkbox"
                defaultChecked={checked}
                onChange={onClickChangeStatus}
              />
            </Card.Title>
          </Col>
          <Col lg={2}>
            <Card.Title
              onClick={onClickDeleteChecklist}
              className="checklist-delete"
            >
              X
            </Card.Title>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Checklist;
