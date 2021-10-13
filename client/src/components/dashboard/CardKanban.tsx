import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import DeleteCardForm from "./DeleteCardForm";

const CardKanban = ({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description: string;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const onClickDeleteCard = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  return (
    <>
      {openDeleteModal ? <DeleteCardForm id={id} /> : null}
      <Card className="card-kanban">
        <Card.Body>
          <Card.Title className="card-kanban-header">{title}</Card.Title>
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
