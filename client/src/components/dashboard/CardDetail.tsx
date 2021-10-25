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
import CreateChecklistForm from "./CreateChecklistForm";


interface IChecklist {
  id: number;
  title: string;
  status: number;
}

export interface ICardDetail {
  colId: number;
  id: number;
  card_name: string;
  card_description: string;
  checklists: any[];
}

const CardDetail = ({ card }: { card: ICardDetail }) => {
  const cardState = useSelector((state: RootState) => state.cards);
  const workspace = useSelector((state: RootState) => state.workspaces);
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
    const bodyData = {
      ...values,
      id: card.id,
      colId: card.colId,
      wid: workspace.wid,
    };
    await dispatch(updateCard(bodyData));
    await dispatch(fetchColumns(workspace.wid));
    toggleModal();
    resetForm();
  };

  const [openCreateChecklist, setOpenForm] = useState(false);

  const onClickOpenCreateChecklist = () => {
    setOpenForm(!openCreateChecklist);
  };

  const viewChecklist = card.checklists
    ? card.checklists.map((i) => (
        <div >
          <Checklist
            key={i.id}
            id={i.id}
            cardId={card.id}
            title={i.title}
            status={i.status}
          />
        </div>
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
              {openCreateChecklist ? (
                <>
                  <h2 className="hide-create" onClick={onClickOpenCreateChecklist}>
                    -
                  </h2>
                  <CreateChecklistForm cardId={card.id} />
                </>
              ) : (
                <Button onClick={onClickOpenCreateChecklist} className="card-btn">
                  +
                </Button>
              )}
              {viewChecklist}
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

export default CardDetail;
