import React, { useState } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { deleteCard } from "../../redux/slices/card";
import { deleteColumn } from "../../redux/slices/collumns";
import { deleteWorkspace } from "../../redux/slices/workspace";
import { AnyArray } from "immer/dist/internal";

const ModalDelete = ({
  category,
  id,
  ...rest
}: {
  category: string;
  id: any;
  colid?: any;
}) => {
  const [showModal, setShowModal] = useState(true);

  const auth = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const onClickDelete = async () => {
    switch (category) {
      case "columns":
        dispatch(deleteColumn(id));
        break;
      case "cards":
        dispatch(deleteCard(id));
        break;
      case "workspaces":
        const uid = auth.user.id;
        const condition = { wid: id, uid };
        dispatch(deleteWorkspace(condition));
        break;
      default:
        break;
    }
    setShowModal(!showModal);
  };

  const onClickCancel = () => {
    setShowModal(!showModal);
  };

  return (
    <>
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
    </>
  );
};

export default ModalDelete;
