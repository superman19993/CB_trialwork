import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import DeleteCardForm from "./DeleteCardForm";
import UpdateCardForm from "./UpdateCardForm";

const CardKanban = ({
  colId,
  id,
  title,
  description,
}: {
  colId: number;
  id: number;
  title: string;
  description: string;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const onClickDeleteCard = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const [updateCardModal, setUpdateCardModal] = useState(false);

  const onClickUpdateCard = () => {
    setUpdateCardModal(!updateCardModal);
  };

  return (
    <>
      {updateCardModal ? (
        <UpdateCardForm
          colId={colId}
          id={id}
          title={title}
          description={description}
        />
      ) : null}
      {openDeleteModal ? <DeleteCardForm id={id} /> : null}
      <Card className="card-kanban">
        <Card.Body>
          <Card.Title
            onClick={onClickUpdateCard}
            className="card-kanban-header"
          >
            {title}
          </Card.Title>
          <Card.Title
            onClick={onClickDeleteCard}
            className="card-kanban-delete"
          >
            X
          </Card.Title>
          <Card.Text className="card-kanban-content">{description}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardKanban;
