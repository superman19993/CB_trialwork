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
import {
  addMemberToCard,
  fetchUsersInCard,
} from "../../redux/slices/usersCards";

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
  usersInCard: any[];
}

const CardDetail = ({ card }: { card: ICardDetail }) => {
  const cardState = useSelector((state: RootState) => state.cards);
  const workspace = useSelector((state: RootState) => state.workspaces);
  const checklists = useSelector((state: RootState) => state.checklists);
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();

  const initializeValues = {
    title: card.card_name,
    description: card.card_description,
    checklist: card.checklists,
    usersInCard: card.usersInCard,
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

  const viewMembers = card.usersInCard
    ? card.usersInCard.map((i) => (
        <Col lg={2}>
          <UsersCard id={i.id} email={i.email} username={i.username} />
        </Col>
      ))
    : null;

  const addUserToCard = async (e: any, username: string) => {
    const bodyData = { username, cardId: card.id };
    await dispatch(addMemberToCard(bodyData));
    await dispatch(fetchUsersInCard(card.id));
  };

  const onClickCreateComment = async (values: any, { resetForm }: any) => {
    console.log(values);
    resetForm();
  };

  const membersDropdown = workspace.joinUsers
    ? workspace.joinUsers.map((username, index) => (
        <Dropdown.Item
          key={index}
          onClick={(e: any) => addUserToCard(e, username)}
        >
          {username}
        </Dropdown.Item>
      ))
    : null;

  return (
    <Modal
      className="detail-card"
      show={showModal}
      onHide={() => setShowModal(!showModal)}
    >
      <Row>
        <Col>
          <Modal.Header>Done: {cardState.percentage}%</Modal.Header>
        </Col>
        <Col lg={6}>
          <Modal.Header>
            <Row sm={12}>
              <Col lg={2}>Members:</Col>
              {viewMembers}
            </Row>
          </Modal.Header>
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

                      <Dropdown.Menu>{membersDropdown}</Dropdown.Menu>
                    </Dropdown>
                  </Row>
                </Col>
              </Row>
              <Formik
                initialValues={{ content: "" }}
                onSubmit={onClickCreateComment}
              >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col lg={8}>
                        <FormControl
                          as="textarea"
                          aria-label="With textarea"
                          name="content"
                          placeholder="Write something here"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.content}
                        />
                      </Col>
                      <Col lg={4}>
                        <Button
                          type="submit"
                          style={{ float: "right" }}
                          onClick={() => {}}
                          className="comment-btn"
                        >
                          Comment
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
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
