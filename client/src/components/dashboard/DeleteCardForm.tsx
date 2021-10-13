import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/card/card.css";

const DeleteCardForm = ({ id }: { id: number }) => {
  const [showModal, setShowModal] = useState(true);

  return (
    <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
      <Modal.Header>Comfirm delete</Modal.Header>
      <Modal.Body>
        <Button className="btn-delete">Delete</Button>
        <Button className="btn-cancle">Cancle</Button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteCardForm;
