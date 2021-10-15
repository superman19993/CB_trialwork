import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/card/card.css";

const DeleteCollumn = ({ id }: { id: number }) => {
  const [showModal, setShowModal] = useState(true);

  const onClickDelete = () => {
    setShowModal(!showModal);
  };

  const onClickCancel = () => {
    setShowModal(!showModal);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
      <Modal.Header>Comfirm delete</Modal.Header>
      <Modal.Body>
        <Button onClick={onClickDelete} className="btn-delete">
          Delete
        </Button>
        <Button onClick={onClickCancel} className="btn-cancle">
          Cancle
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteCollumn;
