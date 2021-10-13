import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "../../css/card/card.css";
import CardKanban from "./CardKanban";
import { Formik, Form, Field } from "formik";
import InputField from "../InputField";
import CreateCardForm from "./CreateCardForm";
import DeleteCollumn from "./DeleteCollumn";

interface ICard {
  id: number;
  title: string;
  description: string;
}

export interface ICollumn {
  id: number;
  title: string;
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

  return (
    <>
      {openDeleteModal ? <DeleteCollumn id={collumn.id} /> : null}
      <Card className="card-collumn">
        <Card.Body>
          <Card.Title onClick={onClickDeleteCollumn} style={{ float: "right" }}>
            x
          </Card.Title>
          <Card.Title>{collumn.title}</Card.Title>

          {openFormCol ? (
            <>
              <h2 className="hide-create" onClick={onClickFormCol}>
                -
              </h2>
              <CreateCardForm />
            </>
          ) : (
            <Button onClick={onClickFormCol} className="card-btn">
              +
            </Button>
          )}

          {collumn.cards.map((card) => (
            <CardKanban
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </Card.Body>
      </Card>
    </>
  );
};

export default Collumn;
