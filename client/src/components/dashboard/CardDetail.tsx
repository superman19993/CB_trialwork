import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Body } from "react-bootstrap/lib/Media";
import { useDispatch, useSelector } from "react-redux";
import { updateCard } from "../../redux/slices/card";
import { fetchChecklists } from "../../redux/slices/checklist";
import { fetchColumns } from "../../redux/slices/collumns";
import { RootState } from "../../redux/store";
import Checklist from "./Checklist";

interface IChecklist {
  checklist_id: number;
  title: string;
  status: number;
}

export interface ICardDetail {
  colId: number | string;
  id: number;
  card_name: string;
  card_description: string;
  checklists: any[];
}

const CardDetail = ({ card }: { card: ICardDetail }) => {
  const cardState = useSelector((state: RootState) => state.cards);
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();

  const initializeValues = {
    title: card.card_name,
    description: card.card_description,
    checklist: card.checklists,
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handlerSubmit = async (values: any, { resetForm }: any) => {
    // const bodyData = { ...values, id, colId};
    // await dispatch(updateCard(bodyData));
    // await dispatch(fetchColumns());
    // toggleModal();
    // resetForm();
  };

  const viewChecklist = card.checklists
    ? card.checklists.map((i) => (
        <Checklist
          key={i.checklist_id}
          id={i.checklist_id}
          cardId={card.id}
          title={i.title}
          status={i.status}
        />
      ))
    : null;

  return (
    <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
      <Modal.Header>Details</Modal.Header>
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
              {viewChecklist}
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

export default CardDetail;
