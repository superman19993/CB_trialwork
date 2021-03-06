import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/card/card.css";
import { deleteCard } from "../../redux/slices/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchColumns } from "../../redux/slices/collumns";
import { RootState } from "../../redux/store";

const DeleteCardForm = ({ id }: { id: number }) => {
  const [showModal, setShowModal] = useState(true);

  const workspace = useSelector((state: RootState) => state.workspaces);

  const dispatch = useDispatch();

  const onClickDelete = async () => {
    setShowModal(!showModal);
    const condition = { id, wid: workspace.wid };
    await dispatch(deleteCard(condition));
    await dispatch(fetchColumns(workspace.wid));
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
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteCardForm;
