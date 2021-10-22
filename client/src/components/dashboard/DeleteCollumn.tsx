import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/card/card.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteColumn, fetchColumns } from "../../redux/slices/collumns";
import { RootState } from "../../redux/store";

const DeleteCollumn = ({ id }: { id: number }) => {
  const [showModal, setShowModal] = useState(true);

  const workspace = useSelector((state: RootState) => state.workspaces);

  const dispatch = useDispatch();

  const onClickDelete = async () => {
    await dispatch(deleteColumn(id));
    await dispatch(fetchColumns(workspace.wid));
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
