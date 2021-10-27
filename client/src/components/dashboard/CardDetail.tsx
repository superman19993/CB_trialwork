import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Form,
  FormControl,
  Modal,
  Row,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Body } from "react-bootstrap/lib/Media";
import { useDispatch, useSelector } from "react-redux";
import { updateCard } from "../../redux/slices/card";
import { fetchChecklists } from "../../redux/slices/checklist";
import { fetchColumns } from "../../redux/slices/collumns";
import { RootState } from "../../redux/store";
import Checklist from "./Checklist";
import CreateChecklistForm from "./CreateChecklistForm";
import "../../css/card/carddetail.css";
import UsersCard from "./UsersCard";

interface IChecklist {
  id: number;
  title: string;
  status: number;
}

export interface ICardDetail {
  colId: number | string;
  id: number;
  card_name: string;
  card_description: string;
  checklists: any[];
  users: any[];
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
    user: card.users,
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
        <div className="checklist-side">
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

  const viewMembers = card.users
    ? card.users.map((i) => (
        <div>
          <UsersCard cardid={card.id} userid={i.userid} username={i.username} />
        </div>
      ))
    : null;

  const DoneChecklists = card.checklists.reduce(
    (counter, { status }) => (status === "1" ? (counter += 1) : counter),
    0
  );
  const Percentage = ((DoneChecklists / card.checklists.length) * 100).toFixed(
    1
  );

  return (
    <Modal
      className="detail-card"
      show={showModal}
      onHide={() => setShowModal(!showModal)}
    >
      <Row>
        <Col>
          <Modal.Header>Details</Modal.Header>
        </Col>
        <Col style={{ right: "20%" }}>
          <Modal.Header>Done: {Percentage}%</Modal.Header>
        </Col>
        <Col style={{ right: "35%" }}>
          <Modal.Header>Members:  {viewMembers} </Modal.Header>
        </Col>
      </Row>
      <Formik initialValues={initializeValues} onSubmit={handlerSubmit}>
        {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
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
                  <h2
                    className="hide-create"
                    onClick={onClickOpenCreateChecklist}
                  >
                    -
                  </h2>
                  <CreateChecklistForm cardid={card.id} />
                </>
              ) : (
                <Button
                  onClick={onClickOpenCreateChecklist}
                  className="card-btn"
                >
                  Add checklist
                </Button>
              )}
              <Row>
                <Col lg={8}>{viewChecklist}</Col>
                <Col lg={4} style={{ right: "-9%" }}>
                  <Row>
                    <Dropdown>
                      <Dropdown.Toggle>Add members</Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">User1</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">User2 </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">User3</Dropdown.Item>

                        <Dropdown.Item href="#/action-4">User4</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Row>
                  <Row>
                    <Button onClick={() => {}} className="comment-btn">
                      Comment
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" className="btn-add-collumn">
                Update
              </Button>
              <Button onClick={toggleModal} className="btn-cancle-add">
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CardDetail;
