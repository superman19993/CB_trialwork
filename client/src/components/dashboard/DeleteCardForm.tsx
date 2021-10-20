import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/card/card.css";
import { deleteCard } from "../../redux/slices/card";
import { useDispatch } from "react-redux";
import { fetchColumns } from "../../redux/slices/collumns";

const DeleteCardForm = ({ id }: { id: number }) => {
  const [showModal, setShowModal] = useState(true);

  const dispatch = useDispatch();

  const onClickDelete = async () => {
    setShowModal(!showModal);
    await dispatch(deleteCard(id));
    await dispatch(fetchColumns());
  };

  const onCancel = () => {
    setShowModal(!showModal);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
      <Modal.Header>Comfirm delete</Modal.Header>
      <Modal.Body>
        <Button onClick={onClickDelete} className="btn-delete">
          Delete
        </Button>
        <Button onClick={onCancel} className="btn-cancle">
          Cancle
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteCardForm;
