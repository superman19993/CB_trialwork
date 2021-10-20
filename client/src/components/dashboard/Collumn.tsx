import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "../../css/card/card.css";
import CardKanban from "./CardKanban";
import { Formik, Form, Field } from "formik";
import InputField from "../InputField";
import CreateCardForm from "./CreateCardForm";
import DeleteCollumn from "./DeleteCollumn";
import { useDrag } from "react-dnd";
import UpdateColumnForm from "./UpdateColumnForm";

interface ICard {
  card_id: number;
  title: string;
  description: string;
}

export interface ICollumn {
  id: number;
  column_name: string;
  cards: ICard[];
}

const Collumn = ({ collumn }: { collumn: ICollumn }) => {
  const [openFormCol, setOpenFormCol] = useState(false);

  const onClickFormCol = () => {
    setOpenFormCol(!openFormCol);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const onClickDeleteCollumn = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const onClickUpdateCollumn = () => {
    setOpenUpdateModal(!openUpdateModal);
  };

  return (
    <>
      {openDeleteModal ? <DeleteCollumn id={collumn.id} /> : null}
      {openUpdateModal ? (
        <UpdateColumnForm colId={collumn.id} title={collumn.column_name} />
      ) : null}
      <Card className="card-collumn">
        <Card.Body>
          <Card.Title onClick={onClickDeleteCollumn} style={{ float: "right" }}>
            x
          </Card.Title>
          <Card.Title onClick={onClickUpdateCollumn}>
            {collumn.column_name}
          </Card.Title>

          {openFormCol ? (
            <>
              <h2 className="hide-create" onClick={onClickFormCol}>
                -
              </h2>
              <CreateCardForm id={collumn.id} />
            </>
          ) : (
            <Button onClick={onClickFormCol} className="card-btn">
              +
            </Button>
          )}
          <div className="scroll">
            {collumn.cards.map((card) => (
              <CardKanban
                key={card.card_id}
                colId={collumn.id}
                id={card.card_id}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Collumn;
